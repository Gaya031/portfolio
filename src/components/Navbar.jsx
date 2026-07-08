import { navIcons, navLinks, locations } from "#constants";
import React, { useEffect, useRef } from "react";
import dayjs from "dayjs";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();
  const navRef = useRef(null);
  const timeRef = useRef(null);

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

    const baseColor = "#111827";
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
  }, []);

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
    <nav ref={navRef} style={{ opacity: 0 }} className="text-slate-900">
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold text-slate-900">Gaya's Portfolio</p>
        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li
              key={id}
              onClick={() => handleNavClick(name, type)}
              className="rounded-md px-2 py-1 transition-colors duration-300 hover:bg-black/5"
            >
              <p className="text-slate-900">{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li
              key={id}
              className="rounded-md p-1 transition-colors duration-300 hover:bg-black/5"
            >
              <img src={img} alt={`icon-${id}`} />
            </li>
          ))}
        </ul>

        <time ref={timeRef} className="text-slate-900">
          {dayjs().format("ddd MMM D h:mm A")}
        </time>
      </div>
    </nav>
  );
};

export default Navbar;
