import React, { useRef } from "react";
import dayjs from "dayjs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import StatusBar from "./components/StatusBar";
import { Flashlight, Camera } from "lucide-react";

gsap.registerPlugin(Draggable);

const LockScreen = ({ onUnlock }) => {
  const screenRef = useRef(null);
  const swipeTextRef = useRef(null);
  const dateStr = dayjs().format("dddd, MMMM D");
  const timeStr = dayjs().format("h:mm");

  // Idle pulse animation for "Swipe up to open"
  useGSAP(() => {
    gsap.to(swipeTextRef.current, {
      opacity: 0.4,
      y: -4,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, []);

  // Vertical Draggable for unlocking
  useGSAP(() => {
    let triggered = false;
    Draggable.create(screenRef.current, {
      type: "y",
      bounds: { minY: -window.innerHeight, maxY: 0 },
      onDrag: function() {
        // Fade out screen as we swipe up
        const progress = Math.abs(this.y) / 400;
        gsap.to(screenRef.current, { css: { filter: `blur(${progress * 15}px)` }, duration: 0.1 });
      },
      onDragEnd: function () {
        if (this.y < -150 && !triggered) {
          triggered = true;
          // Finish the swipe up
          gsap.to(screenRef.current, {
            y: -window.innerHeight,
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: onUnlock
          });
        } else {
          // Bounce back to locked state
          gsap.to(screenRef.current, {
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.75)",
            onUpdate: () => {
              gsap.to(screenRef.current, { css: { filter: `blur(0px)` }, duration: 0.1 });
            }
          });
        }
      },
    });
  }, [onUnlock]);

  return (
    <div
      ref={screenRef}
      className="absolute inset-0 w-full h-full flex flex-col z-50 touch-none select-none bg-cover bg-center cursor-grab active:cursor-grabbing"
      style={{ backgroundImage: "url('/images/wallpaper.png')" }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <StatusBar theme="light" />

      {/* Clock Area */}
      <div className="relative mt-8 flex flex-col items-center">
        <p className="text-xl font-semibold opacity-90">{dateStr}</p>
        <h1 className="text-[100px] font-bold leading-none tracking-tight" style={{ fontFamily: "San Francisco, -apple-system, sans-serif" }}>
          {timeStr}
        </h1>
      </div>

      {/* Lock Screen Toggles */}
      <div className="absolute bottom-12 w-full px-12 flex justify-between">
        <div className="w-[50px] h-[50px] rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
          <Flashlight className="text-white opacity-80" size={24}/>
        </div>
        <div className="w-[50px] h-[50px] rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
          <Camera className="text-white opacity-80" size={24}/>
        </div>
      </div>

      {/* Swipe up text */}
      <div ref={swipeTextRef} className="absolute bottom-4 w-full text-center pb-2">
        <p className="text-sm font-medium tracking-wide">Swipe up to open</p>
      </div>
      
      {/* Fixed Home Indicator line at very bottom - acts as visual cue */}
      <div className="absolute bottom-2 left-0 w-full flex justify-center pb-1">
        <div className="w-[135px] h-[5px] rounded-full bg-white opacity-90"></div>
      </div>
    </div>
  );
};

export default LockScreen;
