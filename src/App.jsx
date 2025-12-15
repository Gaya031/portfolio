import { Dock, Home, Navbar, Welcome } from '#components';
import React from "react";
import gsap from "gsap";
import { Draggable } from 'gsap/Draggable';
import { Finder, Resume, Safari, Terminal, Text, Image, Contact, Photos } from '#windows';
gsap.registerPlugin(Draggable)

const App = () => {
  return (
    <main>
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
  );
};

export default App;
