import { dockApps } from "#constants";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import { Tooltip } from "react-tooltip";

const Dock = () => {
  const dockRef = useRef(null);
  const { openWindow, closeWindow, windows } = useWindowStore();

  // ─── Entrance animation: slide up + stagger ─────────────────────────────
  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;
    const icons = dock.querySelectorAll(".dock-icon");

    gsap.fromTo(
      dock.closest("section"),
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.4 }
    );
    gsap.fromTo(
      icons,
      { y: 40, opacity: 0, scale: 0.5 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.55,
        stagger: 0.07,
        ease: "back.out(2)",
        delay: 0.55,
      }
    );
  });

  // ─── Magnification hover ─────────────────────────────────────────────────
  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;
    const icons = dock.querySelectorAll(".dock-icon");
    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect();
      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2) / 2000);
        gsap.to(icon, {
          scale: 1 + 0.3 * intensity,
          y: -18 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };
    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(e.clientX - left);
    };
    const resetIcons = () =>
      icons.forEach((icon) => {
        gsap.to(icon, { scale: 1, y: 0, duration: 0.3, ease: "power1.out" });
      });
    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);
    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  });

  const toggleApp = (app) => {
    if (!app.canOpen) return;
    const win = windows[app.id];
    if (!win) return;
    if (win.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => {
          const isOpen = windows[id]?.isOpen ?? false;
          return (
            <div key={id} className="relative flex flex-col items-center gap-0.5">
              <button
                type="button"
                className="dock-icon"
                aria-label={name}
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={name}
                data-tooltip-delay-show={150}
                disabled={!canOpen}
                onClick={() => toggleApp({ id, canOpen })}
                style={{ opacity: 0 }}
              >
                <img
                  src={`/images/${icon}`}
                  alt={name}
                  loading="lazy"
                  className={canOpen ? "" : "opacity-60"}
                />
              </button>
              {/* Active dot */}
              <ActiveDot isOpen={isOpen} />
            </div>
          );
        })}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

// Small dot that animates in/out when app is open
const ActiveDot = ({ isOpen }) => {
  const dotRef = useRef(null);

  useGSAP(() => {
    if (!dotRef.current) return;
    if (isOpen) {
      gsap.to(dotRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(2)",
      });
    } else {
      gsap.to(dotRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <span
      ref={dotRef}
      className="block w-1 h-1 rounded-full bg-white/80"
      style={{ transform: "scale(0)", opacity: 0 }}
    />
  );
};

export default Dock;
