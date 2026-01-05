import { create } from 'zustand';

interface AiChatState {
  open: boolean;
  selectedText: string;
  openDialog: () => void;
  closeDialog: () => void;
  setSelectedText: (text: string) => void;
}

export const useAiChatStore = create<AiChatState>((set) => ({
  open: false,
  selectedText: '',
  openDialog: () => set({ open: true }),
  closeDialog: () => set({ open: false }),
  setSelectedText: (text: string) => set({ selectedText: text }),
}));
