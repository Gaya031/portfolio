import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{
        fontVariationSettings: `'wght' ${baseWeight}`,
        display: "inline-block",
        opacity: 0,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2.5) / 20000);
      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () =>
    letters.forEach((letter) => animateLetter(letter, base, 0.3));
  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);
  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    // --- Entrance: stagger each character in ---
    const subtitleSpans = subtitleRef.current?.querySelectorAll("span") ?? [];
    const titleSpans = titleRef.current?.querySelectorAll("span") ?? [];

    const tl = gsap.timeline({ delay: 0.15 });

    // Subtitle chars stagger in (slide up + fade)
    tl.fromTo(
      subtitleSpans,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "power3.out",
      }
    );

    // Title chars stagger in with slight delay after subtitle
    tl.fromTo(
      titleSpans,
      { opacity: 0, y: 40, fontVariationSettings: "'wght' 900" },
      {
        opacity: 1,
        y: 0,
        fontVariationSettings: "'wght' 400",
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
      },
      "-=0.2"
    );

    // --- Hover interactions (set up after entrance) ---
    tl.call(() => {
      const titleCleanup = setupTextHover(titleRef.current, "title");
      const subTitleCleanup = setupTextHover(subtitleRef.current, "subtitle");
      // cleanup on unmount via return — we store on the tl call
      gsap.ticker.add(function checkUnmount() {});
      return () => {
        subTitleCleanup();
        titleCleanup();
      };
    });
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Gaya! Welcome to my",
          "text-3xl font-georama",
          100
        )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText("portfolio.", "text-9xl italic font-georama")}
      </h1>
      <div className="small-screen">
        <p>This Portfolio is designed for desktop/Tablet screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;
