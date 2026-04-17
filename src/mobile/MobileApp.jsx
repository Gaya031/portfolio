import LockScreen from "./LockScreen";
import HomeScreen from "./HomeScreen";
import DynamicIsland from "./components/DynamicIsland";
import { useState } from "react";

const MobileApp = () => {
  const [isLocked, setIsLocked] = useState(true);

  // iPhone 15 Pro Max dimensions roughly 430x932
  // We'll wrap the whole app in a mobile shell that forces these exact bounds 
  // if viewed on a larger screen, but on a real phone it'll just fill the screen.

  return (
    <div className="flex bg-black items-center justify-center w-dvw h-dvh overflow-hidden select-none touch-none">
      {/* Phone Hardware Shell (Only visible on desktop/tablets when testing the mobile view) */}
      <div className="relative overflow-hidden bg-black text-white w-full h-full sm:w-[430px] sm:h-[942px] sm:rounded-[55px] sm:border-[12px] sm:border-gray-800 shadow-2xl flex flex-col">

        {/* Dynamic Island (Interactive Notch) */}
        <DynamicIsland />

        {/* Content Area */}
        <div className="relative flex-1 w-full h-full overflow-hidden">
          {isLocked ? (
            <LockScreen onUnlock={() => setIsLocked(false)} />
          ) : (
            <HomeScreen onLock={() => setIsLocked(true)} />
          )}
        </div>

      </div>
    </div>
  );
};

export default MobileApp;
