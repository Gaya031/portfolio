import { BootScreen, CursorSpotlight, Dock, Home, Navbar, Welcome } from '#components';
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from 'gsap/Draggable';
import { Finder, Resume, Safari, Terminal, Text, Image, Contact, Photos } from '#windows';
import MobileApp from "./mobile/MobileApp"; // New Mobile Entry Point
import DesktopWidgets from "./components/DesktopWidgets";
import useThemeStore from "#store/theme";
import useContextMenuStore from "#store/contextMenu";
import ContextMenu from "./components/ContextMenu";
gsap.registerPlugin(Draggable);

const ParallaxBackground = () => {
  const bgRef = useRef(null);
  const { theme } = useThemeStore();
  const wallpaperUrl = theme === "dark" ? "/images/dark-wallpaper.jpg" : "/images/wallpaper.png";

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    const onMove = (e) => {
      const xPct = (e.clientX / window.innerWidth - 0.5) * 18;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 12;
      gsap.to(el, {
        x: xPct,
        y: yPct,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 z-[-1]"
      style={{
        backgroundImage: `url('${wallpaperUrl}')`,
        backgroundSize: "calc(100% + 36px)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        willChange: "transform",
        transition: "background-image 0.5s ease-in-out"
      }}
    />
  );
};

const App = () => {
  const [booted, setBooted] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { theme } = useThemeStore();
  const { openMenu } = useContextMenuStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Show Mobile Layout directly on small screens without Mac boot screen
  if (isMobile) {
     return <MobileApp />;
  }

  const handleContextMenu = (e) => {
    e.preventDefault();
    openMenu(e.clientX, e.clientY);
  };
  
  return (
    <div className={theme}>
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      {booted && (
        <main 
          className="dark:bg-black/20 transition-colors duration-500"
          onContextMenu={handleContextMenu}
        >
          <ContextMenu />
          <CursorSpotlight />
          <ParallaxBackground />
          <DesktopWidgets />
          <Navbar />
          <Welcome />
          <Dock />
          
          <Terminal />
          <Safari />
          <Resume />
          <Finder />
          <Text />
          <Image />
          <Contact />
          <Photos />
          
          <Home />
        </main>
      )}
    </div>
  );
};

export default App;
