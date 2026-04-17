import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronLeft, Folder, FileText, Image as ImageIcon, Link as LinkIcon, Search, Mail, ExternalLink } from "lucide-react";
import useIslandStore from "#store/island";
import { useRef, useState } from "react";
import { gallery, locations, socials, techStack } from "#constants";
import StatusBar from "./components/StatusBar";
import HomeIndicator from "./components/HomeIndicator";

// ─── Reusable App Shell ──────────────────────────────────────────────────
const AppShell = ({ title, bg = "bg-white", children, onClose }) => {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(ref.current,
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );
  }, []);

  const handleClose = () => {
    gsap.to(ref.current, {
      scale: 0.9, opacity: 0, y: 100, duration: 0.3, ease: "power2.in",
      onComplete: onClose
    });
  };

  return (
    <div ref={ref} className={`absolute inset-0 z-50 flex flex-col ${bg} text-black`}>
      <StatusBar theme={bg === "bg-white" ? "dark" : "light"} />
      <div className="w-full h-12 flex items-center px-4 border-b border-gray-200 shrink-0 bg-white/80 backdrop-blur-md z-10 sticky top-0">
        <button onClick={handleClose} className="flex flex-row items-center text-blue-500 active:opacity-50">
          <ChevronLeft size={24} />
          <span className="text-[17px]">Home</span>
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 font-semibold text-[17px] tracking-tight truncate max-w-[150px]">
          {title}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto w-full pb-8 hide-scrollbar">
        {children}
      </div>
      <HomeIndicator onHome={handleClose} theme={bg === "bg-white" ? "dark" : "light"} />
    </div>
  );
};

// ─── Finder Mobile ────────────────────────────────────────────────────────
export const FinderMobile = ({ onClose }) => {
  const [currentFolder, setCurrentFolder] = useState(locations.work);

  const handleItemClick = (item) => {
    if (item.kind === "folder") {
      setCurrentFolder(item);
    } else if (item.fileType === "url" && item.href) {
      window.open(item.href, "_blank");
    } else {
      alert(`Cannot open ${item.name} yet.`);
    }
  };

  return (
    <AppShell title={currentFolder.name} onClose={onClose}>
      <div className="px-5 py-4 flex flex-col gap-4">
        {currentFolder !== locations.work && (
          <div
            className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl active:bg-gray-200 cursor-pointer"
            onClick={() => setCurrentFolder(locations.work)}
          >
            <ChevronLeft size={20} className="text-gray-500" />
            <span className="text-[17px] font-medium text-gray-700">Back to Work</span>
          </div>
        )}

        <div className="grid grid-cols-4 gap-x-2 gap-y-6">
          {currentFolder.children?.map((item) => (
            <div key={item.id} onClick={() => handleItemClick(item)} className="flex flex-col items-center gap-2 cursor-pointer active:opacity-60">
              <img src={item.icon} alt={item.name} className="w-12 h-12 object-contain drop-shadow-sm" />
              <p className="text-[11px] font-medium text-center leading-tight truncate w-full px-1">{item.name}</p>
            </div>
          ))}
        </div>

        {/* Render text content directly if available inside a single folder */}
        {currentFolder.children?.some(c => c.fileType === 'txt') && (
          <div className="mt-4 p-4 bg-gray-50 rounded-2xl">
            <h3 className="font-semibold mb-2">About:</h3>
            <div className="space-y-2 text-sm text-gray-700">
              {currentFolder.children.find(c => c.fileType === 'txt')?.description?.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
};

// ─── Safari Mobile (Lab) ────────────────────────────────────────────────────
export const SafariMobile = ({ onClose }) => {
  return (
    <AppShell title="Lab" onClose={onClose}>
      <div className="p-5 flex flex-col gap-6">
        <h2 className="text-2xl font-bold tracking-tight">Experiments</h2>
        <div className="flex flex-col gap-4">
          {locations.lab.children.map(exp => (
            <div key={exp.id} className="bg-white border border-gray-200 rounded-[20px] p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <img src="/images/folder.png" className="w-8 h-8" alt="folder" />
                <h3 className="font-semibold text-lg">{exp.name}</h3>
              </div>
              <div className="text-[15px] text-gray-600 space-y-2 mb-4">
                {exp.children.find(c => c.fileType === 'txt')?.description?.map((d, i) => <p key={i}>{d}</p>)}
              </div>
              <a href={exp.children.find(c => c.fileType === 'url')?.href || "#"} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-blue-500 text-white font-semibold rounded-xl active:scale-95 transition-transform">
                <span>View Demo</span>
                <ExternalLink size={18} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
};

// ─── Terminal (Skills) Mobile ─────────────────────────────────────────────
export const TerminalMobile = ({ onClose }) => {
  return (
    <AppShell title="Skills" bg="bg-[#1c1c1e]" onClose={onClose}>
      <div className="p-5 font-mono text-sm text-green-400">
        <p className="mb-6"><span className="text-white">@Gaya ~ %</span> show tech stack</p>
        <div className="flex flex-col gap-6">
          {techStack.map(ts => (
            <div key={ts.category}>
              <p className="font-bold text-blue-400 mb-2"># {ts.category}</p>
              <div className="flex flex-wrap gap-2">
                {ts.items.map(i => (
                  <span key={i} className="px-2 py-1 bg-green-900/40 text-green-300 rounded border border-green-800/50">{i}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
};

// ─── Photos Mobile ──────────────────────────────────────────────────────────
export const PhotosMobile = ({ onClose }) => {
  return (
    <AppShell title="Photos" onClose={onClose}>
      <div className="grid grid-cols-2 gap-1 p-1">
        {gallery.map(g => (
          <div key={g.id} className="aspect-square w-full">
            <img src={g.img} className="w-full h-full object-cover" alt="Gallery" />
          </div>
        ))}
      </div>
    </AppShell>
  );
};

// ─── Contact Mobile ─────────────────────────────────────────────────────────
export const ContactMobile = ({ onClose }) => {
  return (
    <AppShell title="Contact" onClose={onClose}>
      <div className="px-5 py-8 flex items-center flex-col gap-6 text-center">
        <img src="/images/me.jpg" className="w-[120px] h-[120px] rounded-full shadow-lg border-4 border-white" alt="Gaya" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Let's Connect</h2>
          <p className="text-gray-500 mt-2 text-[15px]">Got an idea? A bug to squash? Or just wanna talk tech? I'm in.</p>
        </div>

        <a href="mailto:singhgaya031@gmail.com" className="w-full bg-blue-500 text-white rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform">
          <Mail size={20} />
          singhgaya031@gmail.com
        </a>

        <div className="flex w-full gap-3 mt-4">
          {socials.map(s => (
            <a key={s.id} href={s.link} target="_blank" rel="noreferrer" className="flex-1 rounded-xl p-4 flex flex-col items-center gap-3 active:scale-95 transition-transform" style={{ backgroundColor: s.bg }}>
              <img src={s.icon} className="w-8 h-8" alt={s.text} />
              <span className="text-white font-medium text-sm">{s.text}</span>
            </a>
          ))}
        </div>
      </div>
    </AppShell>
  );
};

// ─── Resume Mobile ──────────────────────────────────────────────────────────
export const ResumeMobile = ({ onClose }) => {
  const { openIsland, setProgress, closeIsland } = useIslandStore();

  const handleDownload = () => {
    openIsland("download", "Gaya-Resume.pdf");

    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => closeIsland(), 1500);
      }
    }, 100);
  };

  return (
    <AppShell title="Resume" onClose={onClose}>
      <div className="px-5 py-8 flex flex-col items-center justify-center h-full gap-6 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center shadow-inner text-red-500">
          <FileText size={48} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Gaya_Resume.pdf</h2>
          <p className="text-gray-500 mt-1">PDF Document</p>
        </div>
        <a
          href="/files/resume2.pdf"
          download
          onClick={handleDownload}
          className="mt-4 px-8 py-3.5 bg-gray-900 text-white font-semibold rounded-full active:scale-95 transition-transform"
        >
          Download PDF
        </a>
      </div>
    </AppShell>
  );
};
