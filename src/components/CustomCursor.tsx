import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const beaconRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Only run on desktop/laptop with a real mouse/pointer
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    const cursor = cursorRef.current;
    const beacon = beaconRef.current;
    const img = imgRef.current;
    if (!cursor) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isVisible = false;
    let isHovered = false;
    let isClicked = false;
    let isText = false;
    let rafId: number;

    // High performance RAF loop: moves cursor on GPU compositor without React re-renders
    const updatePosition = () => {
      // Direct 1:1 instant tracking with sub-pixel interpolation for silky-smooth 144Hz movement
      currentX += (targetX - currentX) * 0.85;
      currentY += (targetY - currentY) * 0.85;

      // When difference is tiny, snap to exact target pixel for 100% click precision
      if (Math.abs(targetX - currentX) < 0.1) currentX = targetX;
      if (Math.abs(targetY - currentY) < 0.1) currentY = targetY;

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      rafId = requestAnimationFrame(updatePosition);
    };

    rafId = requestAnimationFrame(updatePosition);

    const updateVisibility = () => {
      cursor.style.opacity = isVisible && !isText ? "1" : "0";
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        currentX = targetX;
        currentY = targetY;
        updateVisibility();
      }

      // Check boundary
      if (
        e.clientX <= 0 ||
        e.clientY <= 0 ||
        e.clientX >= window.innerWidth - 1 ||
        e.clientY >= window.innerHeight - 1
      ) {
        isVisible = false;
        updateVisibility();
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return; // only left click
      isClicked = true;
      if (img) {
        img.style.transform = "scale(0.88)";
        img.style.filter = "drop-shadow(0 2px 4px rgba(226, 61, 18, 0.4)) brightness(0.95)";
      }

      // Spawn a lightweight, GPU-accelerated micro wave strictly at the tip
      const wave = document.createElement("div");
      wave.className = "cursor-tip-wave";
      wave.style.left = `${e.clientX}px`;
      wave.style.top = `${e.clientY}px`;
      document.body.appendChild(wave);

      wave.addEventListener(
        "animationend",
        () => {
          wave.remove();
        },
        { once: true }
      );
    };

    const handlePointerUp = () => {
      isClicked = false;
      if (img) {
        img.style.transform = isHovered ? "scale(1.15) rotate(-6deg)" : "scale(1)";
        img.style.filter = isHovered
          ? "drop-shadow(0 10px 16px rgba(255, 75, 31, 0.45)) brightness(1.05)"
          : "drop-shadow(0 6px 10px rgba(226, 61, 18, 0.28))";
      }
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInput = target.closest("input, textarea, select, [contenteditable='true']");
      if (isInput) {
        isText = true;
        isHovered = false;
        updateVisibility();
        return;
      }

      if (isText) {
        isText = false;
        updateVisibility();
      }

      const interactive = target.closest(
        "a, button, [role='button'], input[type='submit'], .cursor-pointer, [data-cursor-hover], summary"
      );
      const nowHovered = !!interactive;

      if (nowHovered !== isHovered) {
        isHovered = nowHovered;
        if (beacon) {
          beacon.style.opacity = isHovered ? "1" : "0";
        }
        if (img && !isClicked) {
          img.style.transform = isHovered ? "scale(1.15) rotate(-6deg)" : "scale(1)";
          img.style.filter = isHovered
            ? "drop-shadow(0 10px 16px rgba(255, 75, 31, 0.45)) brightness(1.05)"
            : "drop-shadow(0 6px 10px rgba(226, 61, 18, 0.28))";
        }
      }
    };

    const handleWindowLeave = () => {
      isVisible = false;
      isClicked = false;
      isHovered = false;
      updateVisibility();
    };

    const handleWindowEnter = () => {
      isVisible = true;
      updateVisibility();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleWindowLeave);
    document.documentElement.addEventListener("pointerenter", handleWindowEnter);
    window.addEventListener("blur", handleWindowLeave);
    document.addEventListener("visibilitychange", handleWindowLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointerover", handlePointerOver);
      document.documentElement.removeEventListener("pointerleave", handleWindowLeave);
      document.documentElement.removeEventListener("pointerenter", handleWindowEnter);
      window.removeEventListener("blur", handleWindowLeave);
      document.removeEventListener("visibilitychange", handleWindowLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        transform: "translate3d(-100px, -100px, 0)",
        opacity: 0,
      }}
      className="fixed top-0 left-0 pointer-events-none z-[999999] select-none transition-opacity duration-150 will-change-transform origin-top-left"
      aria-hidden="true"
    >
      {/* Subtle pinpoint beacon right at the tip when hovering clickable items */}
      <div
        ref={beaconRef}
        style={{ opacity: 0 }}
        className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_8px_#FF4B1F] pointer-events-none transition-opacity duration-200"
      />

      {/* 3D Clay Arrow Asset - Tip at (0, 0) */}
      <img
        ref={imgRef}
        src="/cursor-3d.png"
        alt=""
        draggable={false}
        className="w-8 h-auto select-none pointer-events-none origin-top-left transition-all duration-150 ease-out"
        style={{
          filter: "drop-shadow(0 6px 10px rgba(226, 61, 18, 0.28))",
          transformOrigin: "0 0",
        }}
      />
    </div>
  );
}
