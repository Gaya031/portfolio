import React from "react";
import dayjs from "dayjs";
import { Battery, Wifi, Signal } from "lucide-react";

const StatusBar = ({ theme = "light" }) => {
  // iPhone 15 Pro Max status bar
  const textColor = theme === "light" ? "text-white" : "text-black";
  
  return (
    <div className={`w-full h-[47px] flex items-center justify-between px-6 pt-2 pb-1 z-50 text-xs font-semibold ${textColor}`}>
      {/* Time */}
      <div className="flex-1 flex justify-start pl-1 tracking-tight" style={{ fontSize: '15px' }}>
        {dayjs().format("h:mm")}
      </div>
      
      {/* Dynamic Island spacer (implicitly centered) */}
      <div className="flex-none w-[120px]"></div>

      {/* Connectivity Icons */}
      <div className="flex-1 flex justify-end gap-1.5 items-center pr-1">
        <Signal size={16} strokeWidth={2.5} />
        <Wifi size={16} strokeWidth={2.5} />
        <Battery size={20} strokeWidth={2} />
      </div>
    </div>
  );
};

export default StatusBar;
