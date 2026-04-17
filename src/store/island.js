import { create } from "zustand";

const useIslandStore = create((set) => ({
  isOpen: false,
  content: null, // "download" | null
  progress: 0,
  text: "",

  openIsland: (contentStr, textStr = "") => set({ isOpen: true, content: contentStr, text: textStr }),
  closeIsland: () => set({ isOpen: false, content: null, progress: 0, text: "" }),
  setProgress: (val) => set({ progress: val }),
}));

export default useIslandStore;
