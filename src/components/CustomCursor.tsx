import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isText, setIsText] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring: smooth physics spring
  const ringX = useSpring(mouseX, { damping: 26, stiffness: 320, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 26, stiffness: 320, mass: 0.5 });

  // Inner dot: very tight, responsive spring
  const dotX = useSpring(mouseX, { damping: 35, stiffness: 1000 });
  const dotY = useSpring(mouseY, { damping: 35, stiffness: 1000 });

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse/trackpad), not touchscreens
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setHasMouse(mediaQuery.matches);

    const onMediaChange = (e: MediaQueryListEvent) => {
      setHasMouse(e.matches);
    };
    mediaQuery.addEventListener("change", onMediaChange);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
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
  }, [isVisible, mouseX, mouseY]);

  if (!hasMouse) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-300 ${
        isVisible && !isText ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Outer Orbit Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 52 : isClicked ? 24 : 34,
          height: isHovered ? 52 : isClicked ? 24 : 34,
          borderColor: isHovered
            ? "rgba(255, 75, 31, 0.9)"
            : "rgba(255, 75, 31, 0.4)",
          backgroundColor: isHovered
            ? "rgba(255, 75, 31, 0.08)"
            : "rgba(255, 75, 31, 0.02)",
          scale: isClicked ? 0.85 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.3,
        }}
        className="fixed rounded-full border border-dashed border-accent flex items-center justify-center backdrop-blur-[0.5px]"
      >
        {/* Subtle rotating satellite dot on the ring (theme inspired by "Orbiting the Ecosystem") */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-start pointer-events-none"
        >
          <div className="w-1 h-1 rounded-full bg-accent -ml-0.5 opacity-70" />
        </motion.div>
      </motion.div>

      {/* Inner Core Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicked ? 0.6 : isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? "#FF4B1F" : "#FF4B1F",
          boxShadow: isHovered
            ? "0 0 12px rgba(255, 75, 31, 0.8)"
            : "0 0 6px rgba(255, 75, 31, 0.4)",
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 400,
        }}
        className="fixed w-2 h-2 rounded-full"
      />
    </div>
  );
}
