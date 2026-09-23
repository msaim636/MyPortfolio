import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isText, setIsText] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);

  // Raw mouse coordinates
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // High responsiveness spring with subtle physical weight
  const cursorX = useSpring(rawX, { damping: 28, stiffness: 650, mass: 0.12 });
  const cursorY = useSpring(rawY, { damping: 28, stiffness: 650, mass: 0.12 });

  // Velocity-based micro tilt for organic 3D movement
  const velocityX = useVelocity(rawX);
  const tilt = useTransform(velocityX, [-1500, 0, 1500], [-8, 0, 8]);
  const smoothTilt = useSpring(tilt, { damping: 20, stiffness: 250 });

  useEffect(() => {
    // Only enable on desktop/laptops with fine pointers (mouse/trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setHasMouse(mediaQuery.matches);

    const onMediaChange = (e: MediaQueryListEvent) => {
      setHasMouse(e.matches);
    };
    mediaQuery.addEventListener("change", onMediaChange);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInput = target.closest("input, textarea, [contenteditable='true']");
      if (isInput) {
        setIsText(true);
        setIsHovered(false);
        return;
      }
      setIsText(false);

      const isInteractive = target.closest(
        "a, button, [role='button'], input[type='submit'], .cursor-pointer, [data-cursor-hover]"
      );
      setIsHovered(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener("change", onMediaChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, rawX, rawY]);

  if (!hasMouse) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-200 ${
        isVisible && !isText ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* 3D Arrow Container - Aligned exactly at the pointer tip (0, 0) */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          rotate: isHovered ? -6 : smoothTilt,
        }}
        animate={{
          scale: isClicked ? 0.88 : isHovered ? 1.16 : 1,
          translateY: isClicked ? 3 : 0,
        }}
        transition={{
          type: "spring",
          damping: 22,
          stiffness: 400,
          mass: 0.15,
        }}
        className="fixed top-0 left-0 origin-top-left will-change-transform"
      >
        {/* Interactive Pulse Glow under the tip when hovering clickable items */}
        {isHovered && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-accent/30 blur-sm pointer-events-none"
          />
        )}

        {/* 3D Clay Arrow Cursor */}
        <img
          src="/cursor-3d.png"
          alt=""
          draggable={false}
          className="w-9 h-auto select-none pointer-events-none drop-shadow-[0_8px_14px_rgba(226,61,18,0.32)] transition-[filter] duration-200"
          style={{
            filter: isHovered
              ? "drop-shadow(0 12px 18px rgba(255, 75, 31, 0.48)) brightness(1.05)"
              : isClicked
              ? "drop-shadow(0 3px 6px rgba(226, 61, 18, 0.35)) brightness(0.96)"
              : "drop-shadow(0 7px 12px rgba(226, 61, 18, 0.32))",
          }}
        />
      </motion.div>
    </div>
  );
}
