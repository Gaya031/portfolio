import React, { useRef, useEffect } from 'react';
import useContextMenuStore from '#store/contextMenu';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Monitor, FolderPlus, Info, Settings } from 'lucide-react';

const ContextMenu = () => {
  const { isOpen, x, y, closeMenu } = useContextMenuStore();
  const menuRef = useRef(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(menuRef.current, 
        { scale: 0.95, opacity: 0, transformOrigin: "top left" }, 
        { scale: 1, opacity: 1, duration: 0.15, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = () => closeMenu();
    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isOpen, closeMenu]);

  if (!isOpen) return null;

  const menuItems = [
    { label: "New Folder", icon: <FolderPlus size={16} />, action: () => alert("New Folder functionality coming soon!") },
    { label: "Get Info", icon: <Info size={16} />, action: () => alert("GayaOS v1.0.0 - Built with React & GSAP") },
    { label: "Change Wallpaper", icon: <Monitor size={16} />, action: () => alert("Wallpaper gallery coming soon!") },
    { label: "Settings", icon: <Settings size={16} />, divider: true, action: () => alert("Settings opened") },
  ];

  return (
    <div 
      ref={menuRef}
      className="fixed z-[10000] w-56 bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-2xl py-1.5 overflow-hidden select-none"
      style={{ left: x, top: y }}
    >
      {menuItems.map((item, idx) => (
        <React.Fragment key={idx}>
          <div 
            className="flex items-center gap-3 px-3 py-1.5 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-colors cursor-default text-[13px] font-medium text-gray-800 dark:text-gray-200"
            onClick={item.action}
          >
            <span className="opacity-70">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
          </div>
          {item.divider && <div className="h-[1px] bg-gray-200/50 dark:bg-gray-700/50 my-1 mx-3" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ContextMenu;
