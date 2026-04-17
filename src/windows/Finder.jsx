import { WindowControls } from "#components";
import { locations } from "#constants";
import WindowWrapper from "#hoc/windowWrapper";
import useLocationStore from "#store/location";
import { Search } from "lucide-react";
import React, { useRef } from "react";
import clsx from "clsx";
import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const getItemKey = (item) => item.type ?? `${item.kind}-${item.fileType ?? "folder"}-${item.name}`;

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();
  const contentRef = useRef(null);

  // Staggered reveal of content items whenever activeLocation changes
  useGSAP(() => {
    const items = contentRef.current?.querySelectorAll("li");
    if (!items?.length) return;
    gsap.fromTo(
      items,
      { opacity: 0, y: 18, scale: 0.88 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
        stagger: 0.07,
        ease: "back.out(1.5)",
      }
    );
  }, [activeLocation]);

  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={getItemKey(item)}
            onClick={() => setActiveLocation(item)}
            className={clsx(item === activeLocation ? "active" : "not-active")}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const openItem = (item) => {
    if (item.fileType === "pdf") {
      return openWindow("resume", null, { parentWindowKey: "finder" });
    }
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item, {
      parentWindowKey: "finder",
    });
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>
      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList("Faviroutes", Object.values(locations))}
          {renderList("My Projects", locations.work.children)}
        </div>
        <ul ref={contentRef} className="content">
          {activeLocation?.children.map((item) => (
            <li
              key={`${activeLocation.name}-${getItemKey(item)}`}
              onClick={() => openItem(item)}
              style={{ opacity: 0 }}
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

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
