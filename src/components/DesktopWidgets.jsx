import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import dayjs from 'dayjs';

gsap.registerPlugin(Draggable);

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());
  const widgetRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    if (widgetRef.current) {
      Draggable.create(widgetRef.current, {
        bounds: "body",
        type: "x,y",
      });
      // Initial pop-in
      gsap.fromTo(widgetRef.current, { scale: 0, opacity: 0, y: 50 }, { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)", delay: 0.1 });
    }
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const secAngle = seconds * 6;
  const minAngle = minutes * 6 + seconds * 0.1;
  const hrAngle = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div 
      ref={widgetRef}
      className="absolute top-24 right-10 w-[160px] h-[160px] bg-white/40 backdrop-blur-3xl rounded-[35px] shadow-2xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing border border-white/50 max-sm:hidden z-10 hover:shadow-3xl transition-shadow"
      style={{ userSelect: 'none' }}
    >
      <div className="relative w-32 h-32 rounded-full border-[6px] border-white/80 flex items-center justify-center shadow-inner bg-white/20">
        
        {/* Ticks */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className={`absolute ${i % 3 === 0 ? 'w-1.5 h-3 bg-gray-800' : 'w-1 h-2 bg-gray-500 rounded-full'}`}
            style={{ 
              transform: `rotate(${i * 30}deg) translateY(-54px)`, 
            }} 
          />
        ))}

        {/* Hand container for rotation from center */}
        
        {/* Hour Hand */}
        <div 
          className="absolute w-1.5 h-10 bg-gray-900 rounded-full shadow-sm"
          style={{ transformOrigin: 'bottom center', transform: `translateY(-20px) rotate(${hrAngle}deg)` }}
        />
        {/* Minute Hand */}
        <div 
          className="absolute w-1 h-14 bg-gray-700 rounded-full shadow-sm"
          style={{ transformOrigin: 'bottom center', transform: `translateY(-28px) rotate(${minAngle}deg)` }}
        />
        {/* Second Hand */}
        <div 
          className="absolute w-[2px] h-16 bg-red-500 rounded-full shadow-sm"
          style={{ transformOrigin: 'bottom center', transform: `translateY(-32px) rotate(${secAngle}deg)` }}
        />
        
        {/* Center dot */}
        <div className="absolute w-3.5 h-3.5 bg-red-500 rounded-full z-10 shadow-sm border border-red-600" />
      </div>
    </div>
  );
};

const CalendarWidget = () => {
    const time = new Date();
    const widgetRef = useRef(null);

    useGSAP(() => {
        if (widgetRef.current) {
          Draggable.create(widgetRef.current, {
            bounds: "body",
            type: "x,y",
          });
          gsap.fromTo(widgetRef.current, { scale: 0, opacity: 0, y: 50 }, { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)", delay: 0.2 });
        }
      }, []);

    const dayName = dayjs(time).format("dddd");
    const month = dayjs(time).format("MMM");
    const date = time.getDate();

    return (
        <div 
            ref={widgetRef}
            className="absolute top-[280px] right-10 w-[160px] h-[160px] bg-white/80 backdrop-blur-3xl rounded-[35px] shadow-2xl flex flex-col items-center justify-start cursor-grab active:cursor-grabbing border border-white/50 max-sm:hidden z-10 overflow-hidden hover:shadow-3xl transition-shadow"
            style={{ userSelect: 'none' }}
        >
            <div className="w-full h-10 bg-red-500 flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-white font-bold tracking-[0.2em] uppercase text-[10px]">{dayName}</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center pb-2">
                <span className="text-[64px] font-medium leading-none tracking-tighter text-black/90" style={{ fontFamily: 'San Francisco, -apple-system, sans-serif' }}>{date}</span>
                <span className="text-lg font-bold text-red-500 uppercase tracking-wide mt-[-2px]">{month}</span>
            </div>
        </div>
    )
}

const DesktopWidgets = () => {
  return (
    <>
      <ClockWidget />
      <CalendarWidget />
    </>
  );
};

export default DesktopWidgets;
