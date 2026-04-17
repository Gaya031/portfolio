import React, { useRef, useState } from "react";
import { dockApps } from "#constants";
import StatusBar from "./components/StatusBar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FinderMobile, SafariMobile, PhotosMobile, TerminalMobile, ContactMobile, ResumeMobile } from "./MobileAppViews";

const HomeScreen = () => {
  const dockRef = useRef(null);
  const gridRef = useRef(null);
  const [activeApp, setActiveApp] = useState(null);

  // App entrance animation when unlocking
  useGSAP(() => {
    const apps = gridRef.current?.querySelectorAll(".app-icon");
    const dockIcons = dockRef.current?.querySelectorAll(".app-icon");
    
    gsap.fromTo(
      [...(apps || []), ...(dockIcons || [])],
      { scale: 1.2, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: "back.out(1.5)" }
    );
  }, []);

  const openApp = (app) => {
    setActiveApp(app.id);
  };
  
  const closeApp = () => setActiveApp(null);

  // Construct mobile apps grid from locations + dock apps
  const gridApps = [
    { id: "finder", name: "Projects", icon: "/images/finder.png" },
    { id: "safari", name: "Lab", icon: "/images/safari.png" },
    { id: "photos", name: "Gallery", icon: "/images/photos.png" },
    { id: "terminal", name: "Skills", icon: "/images/terminal.png" },
    { id: "resume", name: "Resume", icon: "/images/pdf.png" },
  ];

  const mainDockApps = dockApps.slice(0, 4); // First 4 apps for the mobile dock

  return (
    <div 
      className="absolute inset-0 w-full h-full flex flex-col z-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/wallpaper.png')" }}
    >
      <StatusBar theme="light" />

      {/* Grid area */}
      <div className="flex-1 w-full px-5 pt-8" ref={gridRef}>
        <div className="grid grid-cols-4 gap-x-5 gap-y-7">
          {gridApps.map((app) => (
            <div key={app.id} className="app-icon flex flex-col items-center gap-1.5 cursor-pointer" onClick={() => openApp(app)}>
              <div className="w-[60px] h-[60px] rounded-[14px] bg-white overflow-hidden shadow-sm flex items-center justify-center">
                <img src={app.icon} alt={app.name} className="w-[45px] h-[45px] object-contain" />
              </div>
              <p className="text-white text-xs font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis shadow-black drop-shadow-md">
                {app.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* iOS Dock */}
      <div className="mx-4 mb-8 bg-white/30 backdrop-blur-xl rounded-[30px] p-4 flex justify-between items-center max-w-[400px]" ref={dockRef}>
        {mainDockApps.map((app) => (
          <div key={app.id} className="app-icon cursor-pointer relative" onClick={() => openApp(app)}>
             <div className="w-[60px] h-[60px] rounded-[14px] bg-white overflow-hidden shadow-sm flex items-center justify-center hover:scale-105 transition-transform active:scale-95">
                <img src={`/images/${app.icon}`} alt={app.name} className="w-[45px] h-[45px] object-contain" />
              </div>
          </div>
        ))}
      </div>

      {/* Render Active App View over the Home Screen */}
      {activeApp === "finder" && <FinderMobile onClose={closeApp} />}
      {activeApp === "safari" && <SafariMobile onClose={closeApp} />}
      {activeApp === "photos" && <PhotosMobile onClose={closeApp} />}
      {activeApp === "terminal" && <TerminalMobile onClose={closeApp} />}
      {activeApp === "contact" && <ContactMobile onClose={closeApp} />}
      {activeApp === "resume" && <ResumeMobile onClose={closeApp} />}

    </div>
  );
};

export default HomeScreen;
