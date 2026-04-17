import { create } from "zustand";

const useContextMenuStore = create((set) => ({
  isOpen: false,
  x: 0,
  y: 0,
  
  openMenu: (x, y) => set({ isOpen: true, x, y }),
  closeMenu: () => set({ isOpen: false }),
}));

export default useContextMenuStore;
