import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const HomeIndicator = ({ onHome, theme = "light" }) => {
  const barRef = useRef(null);
  const bgColor = theme === "light" ? "bg-white" : "bg-black";

  useGSAP(() => {
    const el = barRef.current;
    if (!el) return;

    Draggable.create(el, {
      type: "y",
      bounds: { minY: -50, maxY: 0 },
      onDragEnd: function () {
        if (this.y < -20) {
          // Trigger home gesture
          onHome?.();
        }
        // Spring back
        gsap.to(el, { y: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" });
      },
    });
  }, [onHome]);

  return (
    <div className="absolute bottom-2 left-0 w-full h-[20px] z-[9999] flex justify-center items-end pb-1 touch-none">
      <div
        ref={barRef}
        className={`w-[135px] h-[5px] rounded-full cursor-grab active:cursor-grabbing ${bgColor}`}
        style={{ opacity: 0.9 }}
      ></div>
    </div>
  );
};

export default HomeIndicator;
