import WindowControls from "#components/WindowControls";
import { techStack } from "#constants";
import windowWrapper from "#hoc/windowWrapper";
import { Check, Flag } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import SnakeGame from "./components/SnakeGame";

// Typewriter hook: reveals text char by char
const useTypewriter = (text, speed = 18, startDelay = 0) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
};

// A single tech stack row that types its items in, revealed in order
const TechRow = ({ category, items, delay }) => {
  const [visible, setVisible] = useState(false);
  const [itemsDone, setItemsDone] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!visible) return null;

  return (
    <li className="flex items-center">
      <Check className="check" size={20} />
      <h3>{category}</h3>
      <ul>
        {items.slice(0, itemsDone + 1).map((item, i) => (
          <TypedItem
            key={i}
            text={item}
            suffix={i < Math.min(itemsDone, items.length - 1) ? "," : ""}
            onDone={() => setItemsDone((prev) => Math.min(prev + 1, items.length - 1))}
            isLast={i === items.length - 1}
          />
        ))}
      </ul>
    </li>
  );
};

const TypedItem = ({ text, suffix, onDone, isLast }) => {
  const { displayed, done } = useTypewriter(text, 22, 0);

  useEffect(() => {
    if (done && !isLast) onDone();
  }, [done, isLast, onDone]);

  return (
    <li>
      {displayed}
      {done && suffix}
      {done && !isLast && " "}
      {!done && <span className="animate-pulse">▌</span>}
    </li>
  );
};

const ROW_DELAY = 300; // ms between rows

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to GayaOS Terminal v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) {
      setHistory(prev => [...prev, { type: 'command', content: '' }]);
      return;
    }

    const newHistory = [...history, { type: 'command', content: trimmed }];
    
    switch (trimmed.toLowerCase()) {
      case 'help':
        newHistory.push({ type: 'output', content: 'Available commands:\n  help            - Show this message\n  whoami          - Who is Gaya?\n  clear           - Clear terminal history\n  show tech stack - Reload tech stacks list\n  play snake      - Experimental hidden game\n\nNote: Do not try anything funny.' });
        break;
      case 'whoami':
        newHistory.push({ type: 'output', content: 'Gaya - Fullstack Engineer, Problem Solver, UI Polish Enthusiast.' });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'show tech stack':
        newHistory.push({ type: 'techstack' });
        break;
      case 'play snake':
      case 'play game':
        newHistory.push({ type: 'game' });
        break;
      case 'sudo rm -rf /':
        newHistory.push({ type: 'output', content: 'Nice try. You do not have root privileges.' });
        break;
      default:
        newHistory.push({ type: 'output', content: `command not found: ${trimmed}` });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#1c1c1e] overflow-hidden rounded-b-xl">
      <div id="window-header" className="shrink-0" style={{backgroundColor: '#2d2d30', borderBottom: '1px solid #444', color: '#999'}}>
        <WindowControls target="terminal" />
        <h2>gaya@portfolio: ~</h2>
      </div>

      <div 
        className="flex-1 overflow-y-auto p-5 font-mono text-sm leading-relaxed hide-scrollbar"
        style={{ color: '#4ade80' }}
        onClick={() => document.getElementById("terminal-input")?.focus()}
      >
        {history.map((entry, i) => {
          if (entry.type === 'command') {
            return (
              <div key={i} className="mb-2">
                <span className="font-bold">gaya@portfolio:~$</span>
                <span className="ml-2 text-white">{entry.content}</span>
              </div>
            );
          }
          if (entry.type === 'output') {
            return <div key={i} className="mb-4 whitespace-pre-wrap">{entry.content}</div>;
          }
          if (entry.type === 'techstack') {
            return (
              <div key={i} className="mb-6 mt-2 techstack !p-0">
                <div className="label mb-2 flex">
                  <p className="w-32">Category</p>
                  <p>Technologies</p>
                </div>
                <ul className="content">
                  {techStack.map(({ category, items }, j) => (
                    <TechRow
                      key={category}
                      category={category}
                      items={items}
                      delay={j * ROW_DELAY}
                    />
                  ))}
                </ul>
                <div className="flex items-center gap-2 mt-4 text-green-500 opacity-90">
                  <Check size={16} /> 5 of 5 stacks loaded successfully (100%)
                </div>
              </div>
            );
          }
          if (entry.type === 'game') {
            return (
              <div key={i} className="mb-6">
                <SnakeGame onExit={() => handleCommand('clear')} />
              </div>
            );
          }
          return null;
        })}
        
        <div className="flex items-center flex-wrap">
          <span className="font-bold whitespace-nowrap">gaya@portfolio:~$</span>
          <input
            id="terminal-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-white font-mono ml-2 min-w-[200px]"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
};

const TerminalWindow = windowWrapper(Terminal, "terminal");

export default TerminalWindow;
