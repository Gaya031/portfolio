import { navIcons, navLinks, locations } from "#constants";
import React, { useEffect, useRef } from "react";
import dayjs from "dayjs";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useThemeStore from "#store/theme";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();
  const { theme, toggleTheme } = useThemeStore();
  const navRef = useRef(null);
  const timeRef = useRef(null);
  const isDark = theme === "dark";

  // Slide-in entrance
  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", delay: 0.05 }
    );
  }, []);

  useEffect(() => {
    const el = timeRef.current;
    if (!el) return undefined;

    const baseColor = isDark ? "#f3f4f6" : "#111827";
    el.style.color = baseColor;

    const pulse = () => {
      gsap.fromTo(
        el,
        { color: "#3b82f6", scale: 1.08 },
        { color: baseColor, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    };

    pulse();
    const id = setInterval(pulse, 60000);
    return () => clearInterval(id);
  }, [isDark]);

  const handleNavClick = (name, type) => {
    if (name === "About") {
      setActiveLocation(locations.about);
      openWindow("finder");
    } else if (name === "Projects") {
      setActiveLocation(locations.work);
      openWindow("finder");
    } else {
      openWindow(type);
    }
  };

  return (
    <nav
      ref={navRef}
      style={{ opacity: 0 }}
      className={isDark ? "text-slate-100" : "text-slate-900"}
    >
      <div>
        <img
          src="/images/logo.svg"
          alt="logo"
          className={`transition-all duration-300 ${isDark ? "brightness-0 invert" : ""}`}
        />
        <p className={`font-bold transition-colors duration-300 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
          Gaya's Portfolio
        </p>
        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li
              key={id}
              onClick={() => handleNavClick(name, type)}
              className={`rounded-md px-2 py-1 transition-colors duration-300 ${
                isDark ? "hover:bg-white/10" : "hover:bg-black/5"
              }`}
            >
              <p className={`transition-colors duration-300 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                {name}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li
              key={id}
              onClick={id === 4 ? toggleTheme : undefined}
              className={`rounded-md p-1 transition-colors duration-300 ${
                id === 4 ? "cursor-pointer" : ""
              } ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"}`}
            >
              <img
                src={img}
                className={`transition-all duration-300 ${isDark ? "brightness-0 invert" : ""}`}
                alt={`icon-${id}`}
              />
            </li>
          ))}
        </ul>

        <time
          ref={timeRef}
          className={`transition-colors duration-300 ${isDark ? "text-slate-100" : "text-slate-900"}`}
        >
          {dayjs().format("ddd MMM D h:mm A")}
        </time>
      </div>
    </nav>
  );
};

export default Navbar;
