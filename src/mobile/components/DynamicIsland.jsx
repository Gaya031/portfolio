import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useIslandStore from '#store/island';
import { Check } from 'lucide-react';

const DynamicIsland = () => {
  const { isOpen, content, progress, text } = useIslandStore();
  const islandRef = useRef(null);

  // Animate Island expanding/contracting
  useGSAP(() => {
    if (!islandRef.current) return;
    
    // Base notch state
    if (!isOpen) {
      gsap.to(islandRef.current, {
        width: 120,
        height: 35,
        borderRadius: 20,
        duration: 0.5,
        ease: "power4.inOut"
      });
      return;
    }

    if (content === "download") {
      // Expand to wide pill
      gsap.to(islandRef.current, {
        width: 250,
        height: 35,
        borderRadius: 20,
        duration: 0.5,
        ease: "elastic.out(1, 0.7)"
      });
    }

  }, [isOpen, content]);

  return (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[9999] hidden sm:flex justify-center pointer-events-none">
      <div 
        ref={islandRef}
        className="bg-black text-white overflow-hidden flex items-center px-4 relative filter drop-shadow-xl"
        style={{ width: 120, height: 35, borderRadius: 20 }}
      >
        {/* Dynamic Content layer - fades in only when open */}
        <div className={`w-full flex items-center justify-between transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
           {content === "download" && (
             <>
               <span className="text-[11px] font-semibold text-gray-300 truncate w-24">
                 {progress >= 100 ? "Finished" : text || "Downloading..."}
               </span>
               {progress < 100 ? (
                 <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden ml-2">
                   <div 
                     className="h-full bg-green-500 rounded-full transition-all duration-200"
                     style={{ width: `${progress}%` }}
                   />
                 </div>
               ) : (
                 <Check size={14} className="text-green-400 ml-2" />
               )}
             </>
           )}
        </div>
      </div>
    </div>
  );
};

export default DynamicIsland;
