import { WindowControls } from "#components";
import { locations } from "#constants";
import WindowWrapper from "#hoc/windowWrapper";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import clsx from "clsx";

const Safari = () => {
  const { activeLocation, setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  // Load LAB as default when Safari opens
  useEffect(() => {
    setActiveLocation(locations.lab);
  }, []);

  // ---------------------------------------------
  // Render sidebar list (Identical to Finder)
  // ---------------------------------------------
  const renderList = (title, items) => (
    <div>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation.id ? "active" : "not-active"
            )}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  // ---------------------------------------------
  // Clicking on items inside content area
  // ---------------------------------------------
  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");

    if (item.kind === "folder") return setActiveLocation(item);

    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    return openWindow(`${item.fileType}${item.kind}`, item);
  };

  // ---------------------------------------------
  // RENDER EXACT FINDER UI
  // ---------------------------------------------
  return (
    <>
      <div id="window-header">
        <WindowControls target="safari" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">

        {/* SIDEBAR (Identical to Finder) */}
        <div className="sidebar">
          {/* Only show Lab section */}
          {renderList("Experiment Lab", [locations.lab])}
          {renderList("Experiments", locations.lab.children)}
        </div>

        {/* CONTENT AREA (Identical to Finder) */}
        <ul className="content">
          {activeLocation?.children?.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>

      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");
export default SafariWindow;
