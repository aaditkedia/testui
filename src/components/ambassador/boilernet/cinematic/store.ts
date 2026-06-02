"use client";

import { create } from "zustand";

interface CinematicState {
  activeIndex: number | null;
  hoverIndex: number | null;
  uiHidden: boolean;
  setActive: (i: number | null) => void;
  setHover: (i: number | null) => void;
  setUiHidden: (h: boolean) => void;
}

export const useCinematicStore = create<CinematicState>((set) => ({
  activeIndex: null,
  hoverIndex: null,
  uiHidden: false,
  setActive: (i) => set({ activeIndex: i, uiHidden: i !== null }),
  setHover: (i) => set({ hoverIndex: i }),
  setUiHidden: (h) => set({ uiHidden: h }),
}));
