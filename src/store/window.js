import { INITIAL_Z_INDEX, createInitialWindows } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useWindowStore = create(
  immer((set) => ({
    windows: createInitialWindows(),
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null, options = {}) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;

        const parentZIndex = options.parentWindowKey
          ? state.windows[options.parentWindowKey]?.zIndex ?? INITIAL_Z_INDEX
          : INITIAL_Z_INDEX;
        const nextZIndex = Math.max(state.nextZIndex, parentZIndex + 1);

        win.isOpen = true;
        win.zIndex = nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex = nextZIndex + 1;
      }),
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),
    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.zIndex = state.nextZIndex++;
      }),
  }))
);

export default useWindowStore;
