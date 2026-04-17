import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import React from "react";
import { locations } from "#constants";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";

const projects = locations.work?.children ?? [];

const Home = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  const handleOpenProjectFinder = (project) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  // Make folders draggable
  useGSAP(() => {
    Draggable.create(".folder");
  }, []);

  const handleFolderClick = (e, project) => {
    const target = e.currentTarget;
    // Bounce animation on click
    gsap.timeline()
      .to(target, { scale: 1.15, duration: 0.12, ease: "power2.out" })
      .to(target, { scale: 0.92, duration: 0.1, ease: "power2.in" })
      .to(target, { scale: 1, duration: 0.15, ease: "back.out(3)" });

    handleOpenProjectFinder(project);
  };

  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <li
            key={`${project.id}-${project.name}`}
            className="group folder"
            onClick={(e) => handleFolderClick(e, project)}
            style={project.desktopPosition}
          >
            <img src="/images/folder.png" alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
