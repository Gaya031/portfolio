import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const BootScreen = ({ onComplete }) => {
  const screenRef = useRef(null);
  const logoRef = useRef(null);
  const barFillRef = useRef(null);
  const barTrackRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Fade in the boot screen
    tl.fromTo(
      screenRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );

    // 2. Apple logo scales in
    tl.fromTo(
      logoRef.current,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.4)" }
    );

    // 3. Progress bar appears
    tl.fromTo(
      barTrackRef.current,
      { opacity: 0, scaleX: 0.8 },
      { opacity: 1, scaleX: 1, duration: 0.3, ease: "power2.out" },
      "-=0.1"
    );

    // 4. Bar fills up
    tl.fromTo(
      barFillRef.current,
      { width: "0%" },
      { width: "100%", duration: 1.6, ease: "power1.inOut" }
    );

    // 5. Whole screen fades out → call onComplete
    tl.to(screenRef.current, {
      opacity: 0,
      scale: 1.04,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete,
      delay: 0.2,
    });
  }, []);

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center gap-10"
      style={{ opacity: 0 }}
    >
      {/* Apple-style logo SVG */}
      <svg
        ref={logoRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 814 1000"
        className="w-20 h-20 fill-white"
        style={{ opacity: 0 }}
      >
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.4 268.9-317.4 71 0 130 46.4 174.4 46.4 42.7 0 109.2-49.8 191.5-49.8 30.8 0 108.2 2.6 168.5 81.3zm-194.4-80.8c-9 42.3-27.7 84.6-54.5 119.3-26.8 34.7-70 62.5-109.4 62.5-3.9 0-7.7-.3-11.6-.9-.6-4.5-.9-9-.9-12.2 0-40.6 18.7-81.2 46.2-115.9 27.4-34.7 84.3-66.4 130.2-74.8z" />
      </svg>

      {/* Progress bar */}
      <div
        ref={barTrackRef}
        className="w-48 h-1 rounded-full overflow-hidden"
        style={{ backgroundColor: "rgba(255,255,255,0.2)", opacity: 0 }}
      >
        <div
          ref={barFillRef}
          className="h-full rounded-full"
          style={{ width: "0%", backgroundColor: "rgba(255,255,255,0.85)" }}
        />
      </div>
    </div>
  );
};

export default BootScreen;
