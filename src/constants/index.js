// =============================================================
// NAV LINKS
// =============================================================
const navLinks = [
  { id: 1, name: "Projects", type: "finder" },
  { id: 2, name: "About", type: "finder" },
  { id: 3, name: "Contact", type: "contact" },
  { id: 4, name: "Resume", type: "resume" },
];

// =============================================================
// NAV ICONS
// =============================================================
const navIcons = [
  { id: 1, img: "/icons/wifi.svg" },
  { id: 2, img: "/icons/search.svg" },
  { id: 3, img: "/icons/user.svg" },
  { id: 4, img: "/icons/mode.svg" },
];

// =============================================================
// DOCK APPS
// =============================================================
const dockApps = [
  { id: "finder", name: "Projects", icon: "finder.png", canOpen: true },
  { id: "safari", name: "Lab", icon: "safari.png", canOpen: true },
  { id: "photos", name: "Gallery", icon: "photos.png", canOpen: true },
  { id: "contact", name: "Contact", icon: "contact.png", canOpen: true },
  { id: "terminal", name: "Skills", icon: "terminal.png", canOpen: true },
  { id: "trash", name: "Archive", icon: "trash.png", canOpen: false },
];

// =============================================================
// TECH STACK (BASED ON YOUR SKILLS)
// =============================================================
const techStack = [
  {
    category: "Languages",
    items: ["Python", "Java"],
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "JavaScript", "Tailwind", "GSAP"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "FastAPI"],
  },
  {
    category: "AI/ML",
    items: ["LLMs", "LangChain", "Vector Search", "RAG Systems"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "PineCone"],
  },
  {
    category: "DevOps",
    items: ["Docker", "Redis", "Git", "GitHub"],
  },
];

// =============================================================
// SOCIAL LINKS (PLACEHOLDERS)
// =============================================================
const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/Gaya031",
  },
  {
    id: 3,
    text: "Codolio",
    icon: "/icons/code-xml.svg",
    bg: "#ff866b",
    link: "https://codolio.com/profile/Gaya031",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/gayasingh031/",
  },
];

// =============================================================
// GALLERY SECTIONS
// =============================================================
const photosLinks = [
  { id: 1, icon: "/icons/gicon1.svg", title: "Library" },
  { id: 2, icon: "/icons/gicon2.svg", title: "Memories" },
  { id: 3, icon: "/icons/file.svg", title: "Places" },
  { id: 4, icon: "/icons/gicon4.svg", title: "People" },
  { id: 5, icon: "/icons/gicon5.svg", title: "Favorites" },
];

const gallery = [
  { id: 1, img: "/images/1.jpg" },
  { id: 2, img: "/images/2.jpg" },
  { id: 3, img: "/images/3.jpg" },
  { id: 4, img: "/images/4.jpg" },
];

export {
  navLinks,
  navIcons,
  dockApps,
  techStack,
  socials,
  photosLinks,
  gallery,
};

// =============================================================
// PROJECTS — WORK LOCATION (YOUR REAL PROJECTS)
// =============================================================
const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // PROJECT 1 – Multi-vendor E-commerce
    {
      id: 5,
      name: "Multi-vendor E-commerce Platform",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-15 left-8",
      windowPosition: "top-[5vh] left-5",
      children: [
        {
          id: 1,
          name: "About.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-8 left-10",
          description: [
            "A powerful, scalable multi-vendor marketplace built with MERN + FastAPI.",
            "Supports seller onboarding, commissions, refund logic, order workflows, and admin controls.",
            "Future-ready architecture with Redis, Docker, and AI integrations.",
          ],
        },
        {
          id: 2,
          name: "Demo.link",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "#",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "Screenshot.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "Coming Soon",
        },
      ],
    },

    // PROJECT 2 – Linkly
    {
      id: 6,
      name: "Linkly",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "About.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "A smart link management + analytics tool.",
            "Includes link tracking, QR generation, and AI-driven insights.",
            "Built with MERN stack for high-performance API handling.",
          ],
        },
        {
          id: 2,
          name: "Demo.link",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://url-shortner-pearl-chi.vercel.app/",
          position: "top-20 left-20",
        },
        {
          id: 3,
          name: "Screenshot.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/Linkly.jpeg",
        },
      ],
    },

    // PROJECT 3 – FoodView
    {
      id: 7,
      name: "Food-View",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-55 left-58",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "About.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "A food listing + browsing web application built with React and Node + Express.",
            "Shows restaurants, dishes, filters, and real-time UX flow.",
            "Designed for clean UI and fast performance.",
            "Developed to showcase the ability of media handling into the application."
          ],
        },
        {
          id: 2,
          name: "Demo.link",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://food-view-75fl3pksh-yadavgaya031s-projects.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "Screenshot.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/food-view.jpeg",
        },
      ],
    },

    // PROJECT 4 – News Summarizer
    {
      id: 8,
      name: "AI News Summarizer",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[40vh] left-25",
      children: [
        {
          id: 1,
          name: "About.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "A FastAPI-powered AI engine that summarizes daily trending news.",
            "Integrated with MERN frontend. Produces audio + text summaries.",
            "Optimized for speed, clarity, and structured output.",
          ],
        },
        {
          id: 2,
          name: "Demo.link",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://news-summarizer-2-xlbc.onrender.com/",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "Screenshot.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/news-summarizer.jpeg",
          position: "top-52 right-80",
        },
      ],
    },
  ],
};

// =============================================================
// EXPERIMENTS / LAB SECTION (Your mini-projects + learnings)
// =============================================================
const LAB_LOCATION = {
  id: 9,
  type: "lab",
  name: "Lab",
  icon: "/icons/flask-conical.svg",
  kind: "folder",
  children: [
    // EXPERIMENT 1 — Chatbot
    {
      id: 1,
      name: "LLM Chatbot",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-8",
      windowPosition: "top-[5vh] left-5",
      children: [
        {
          id: 100,
          name: "chatbot.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-8 left-10",
          description: [
            "A custom-trained chatbot using FastAPI + LLMs.",
            "Understands context, maintains memory, and gives meaningful responses.",
            "Built to learn about prompt engineering and memory architecture.",
          ],
        },
        {
          id: 101,
          name: "Demo.link",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          position: "top-10 right-20",
          href: "https://ai-chatbot-ne82.onrender.com/",
        },
      ],
    },

    // EXPERIMENT 2 — QA Document System
    {
      id: 2,
      name: "QA Document System",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-25 left-32",
      windowPosition: "top-[8vh] left-8",
      children: [
        {
          id: 200,
          name: "qa-doc.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-8 left-10",
          description: [
            "A document-question-answering system built with embeddings + semantic search.",
            "Returns structured outputs: Decision, Amount, Justification.",
            "Built to learn RAG, chunking, and vector databases.",
          ],
        },
        { id: 201, name: "Demo.link", icon: "/images/safari.png", type:"file", fileType: "url", position: "top-10 right-20", href: "#" },
      ],
    },
  ],
};

// =============================================================
// ABOUT ME (BASED ON YOUR PERSONALITY)
// =============================================================
const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/me.jpg",
    },
    {
      id: 2,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-80",
      description: [
        "Hey, I'm Gaya - a MERN + FastAPI engineer obsessed with building real-world, production-grade systems.",
        "I love designing architectures, solving hard backend problems, and experimenting with AI + automation.",
        "Clean code, fast responses, and tough problem-solving are my favorite things.",
        "If I'm not building something, I'm learning something new - and then building again.",
      ],
    },
  ],
};

// =============================================================
// RESUME
// =============================================================
const RESUME_LOCATION = {
  id: 3,
  type: "resume2",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Gaya-Resume.pdf",
      icon: "/images/pdf.png",
      fileType: "pdf",
      href: "#",
    },
  ],
};

// =============================================================
// TRASH
// =============================================================
const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [],
};

// =============================================================
// EXPORT LOCATIONS
// =============================================================
export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
  lab: LAB_LOCATION,
};

// =============================================================
// WINDOW CONFIG
// =============================================================
const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
