import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isText, setIsText] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);
  const [clickRipples, setClickRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const rippleIdRef = useRef(0);

  // Raw mouse coordinates - direct 1:1 hardware tracking (0ms latency for pixel-perfect clicking)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Velocity-based micro tilt for organic 3D movement
  const velocityX = useVelocity(cursorX);
  
  // Subtle 3D dynamic tilt based on mouse velocity
  const tiltX = useTransform(velocityX, [-2000, 0, 2000], [-10, 0, 10]);
  const smoothTilt = useSpring(tiltX, { damping: 25, stiffness: 350 });

  useEffect(() => {
    // Only enable on desktop/laptop devices with fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setHasMouse(mediaQuery.matches);

    const onMediaChange = (e: MediaQueryListEvent) => {
      setHasMouse(e.matches);
    };
    mediaQuery.addEventListener("change", onMediaChange);

    if (!mediaQuery.matches) return;

    const checkInteractive = (target: HTMLElement | null) => {
      if (!target) {
        setIsHovered(false);
        setIsText(false);
        return;
      }

      const isInput = target.closest("input, textarea, select, [contenteditable='true']");
      if (isInput) {
        setIsText(true);
        setIsHovered(false);
        return;
      }
      setIsText(false);

      const isInteractive = target.closest(
        "a, button, [role='button'], input[type='submit'], .cursor-pointer, [data-cursor-hover], summary"
      );
      setIsHovered(!!isInteractive);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Boundary check: ensure cursor stays inside viewport
      if (
        e.clientX <= 0 ||
        e.clientY <= 0 ||
        e.clientX >= window.innerWidth - 1 ||
        e.clientY >= window.innerHeight - 1
      ) {
        setIsVisible(false);
        return;
      }

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      // Create a subtle 3D click pulse at tip
      const id = ++rippleIdRef.current;
      setClickRipples((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setClickRipples((prev) => prev.filter((r) => r.id !== id));
      }, 450);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      checkInteractive(e.target as HTMLElement | null);
    };

    // Keep hover detection accurate when user scrolls under mouse
    const handleScroll = () => {
      const x = cursorX.get();
      const y = cursorY.get();
      if (x > 0 && y > 0) {
        const el = document.elementFromPoint(x, y) as HTMLElement | null;
        checkInteractive(el);
      }
    };

    // Reliable window boundary handling
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleBlur = () => {
      setIsVisible(false);
      setIsClicked(false);
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleBlur);

    return () => {
      mediaQuery.removeEventListener("change", onMediaChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleBlur);
    };
  }, [isVisible, cursorX, cursorY]);

  if (!hasMouse) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none transition-opacity duration-150 ${
        isVisible && !isText ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Click Impact Waves - Localized strictly at the pinpoint tip */}
      {clickRipples.map((ripple) => (
        <div
          key={ripple.id}
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          className="fixed pointer-events-none z-[100000] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          {/* Outer crisp micro wave */}
          <motion.div
            initial={{ width: 2, height: 2, opacity: 0.95 }}
            animate={{ width: 22, height: 22, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute rounded-full border-[1.5px] border-accent"
          />
          {/* Inner tight secondary wave */}
          <motion.div
            initial={{ width: 1, height: 1, opacity: 0.75 }}
            animate={{ width: 13, height: 13, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute rounded-full border border-accent/70"
          />
          {/* Flash pinpoint spark at the tip */}
          <motion.div
            initial={{ scale: 1.8, opacity: 1 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_#FF4B1F]"
          />
        </div>
      ))}

      {/* 3D Arrow Pointer Container - Tip anchored strictly at (0, 0) */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          rotate: isHovered ? -5 : smoothTilt,
        }}
        animate={{
          scale: isClicked ? 0.92 : isHovered ? 1.14 : 1,
        }}
        transition={{
          type: "spring",
          damping: 24,
          stiffness: 500,
          mass: 0.1,
        }}
        className="fixed top-0 left-0 origin-top-left pointer-events-none will-change-transform"
      >
        {/* Subtle pinpoint beacon right at the tip when hovering interactive items */}
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.8, 0.3, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-accent shadow-[0_0_6px_#FF4B1F] pointer-events-none"
          />
        )}

        {/* 3D Clay Arrow Asset */}
        <img
          src="/cursor-3d.png"
          alt=""
          draggable={false}
          className="w-8 h-auto select-none pointer-events-none transition-[filter] duration-200"
          style={{
            filter: isHovered
              ? "drop-shadow(0 10px 16px rgba(255, 75, 31, 0.45)) brightness(1.04)"
              : isClicked
              ? "drop-shadow(0 2px 4px rgba(226, 61, 18, 0.38)) brightness(0.95)"
              : "drop-shadow(0 6px 10px rgba(226, 61, 18, 0.28))",
          }}
        />
      </motion.div>
    </div>
  );
}
