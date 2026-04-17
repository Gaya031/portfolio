import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const CursorSpotlight = () => {
  const spotRef = useRef(null);
  const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;

    // Set initial position
    gsap.set(el, {
      x: posRef.current.x,
      y: posRef.current.y,
      xPercent: -50,
      yPercent: -50,
    });

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      gsap.to(el, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.55,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={spotRef}
      className="pointer-events-none fixed z-0"
      style={{
        width: 520,
        height: 520,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)",
        mixBlendMode: "screen",
        top: 0,
        left: 0,
      }}
    />
  );
};

export default CursorSpotlight;
