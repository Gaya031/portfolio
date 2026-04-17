import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);
    const wasOpenRef = useRef(false);

    // ─── Open animation ───────────────────────────────────────────────────
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (isOpen && !wasOpenRef.current) {
        el.style.display = "block";
        el.style.pointerEvents = "auto";
        gsap.fromTo(
          el,
          { scale: 0.6, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 0.55, ease: "back.out(1.2)" }
        );
        wasOpenRef.current = true;
      }

      if (!isOpen && wasOpenRef.current) {
        // ─── Close animation ─────────────────────────────────────────────
        el.style.pointerEvents = "none";

        // Try to find the dock icon to do a genie/minimize towards it
        const dockIcon = document.querySelector(
          `[aria-label="${getDockLabel(windowKey)}"]`
        );

        if (dockIcon) {
          // Genie — shrink toward dock icon position
          const iconRect = dockIcon.getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          const targetX = iconRect.left + iconRect.width / 2 - (elRect.left + elRect.width / 2);
          const targetY = iconRect.top + iconRect.height / 2 - (elRect.top + elRect.height / 2);

          gsap.to(el, {
            x: `+=${targetX}`,
            y: `+=${targetY}`,
            scale: 0.08,
            opacity: 0,
            duration: 0.45,
            ease: "power3.in",
            onComplete: () => {
              el.style.display = "none";
              // Reset for next open
              gsap.set(el, { x: 0, y: 0, scale: 1, opacity: 1 });
              wasOpenRef.current = false;
            },
          });
        } else {
          // Fallback: simple scale-down fade
          gsap.to(el, {
            scale: 0.55,
            opacity: 0,
            y: 30,
            duration: 0.35,
            ease: "power2.in",
            onComplete: () => {
              el.style.display = "none";
              gsap.set(el, { scale: 1, opacity: 1, y: 0 });
              wasOpenRef.current = false;
            },
          });
        }
      }
    }, [isOpen]);

    // ─── Draggable with elastic spring on release ─────────────────────────
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
        onDragEnd: function () {
          // Elastic bounce-back feel on release
          gsap.to(el, {
            scale: 1,
            duration: 0.4,
            ease: "elastic.out(1, 0.5)",
          });
        },
        onDrag: function () {
          gsap.to(el, { scale: 1.01, duration: 0.1, ease: "power1.out" });
        },
      });
      return () => instance.kill();
    });

    // ─── Initial display sync ─────────────────────────────────────────────
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      if (!isOpen && !wasOpenRef.current) {
        el.style.display = "none";
      }
    }, [isOpen]);

    return (
      <section id={windowKey} ref={ref} style={{ zIndex, display: "none" }} className="absolute">
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

// Map window keys to dock icon aria-labels
const getDockLabel = (key) => {
  const map = {
    finder: "Projects",
    safari: "Lab",
    photos: "Gallery",
    contact: "Contact",
    terminal: "Skills",
    resume: "Resume",
    txtfile: "Projects",
    imgfile: "Projects",
  };
  return map[key] ?? key;
};

export default WindowWrapper;
