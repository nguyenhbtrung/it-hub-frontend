import { create } from 'zustand';

interface SaveState {
  isSubmitting: boolean;
  shouldSubmit: boolean;
  triggerSave: () => void;
  setShouldSubmit: (status: boolean) => void;
  setSubmitting: (status: boolean) => void;
}

export const useSaveStore = create<SaveState>((set) => ({
  isSubmitting: false,
  shouldSubmit: false,

  triggerSave: () => set(() => ({ shouldSubmit: true })),
  setShouldSubmit: (status: boolean) => set({ shouldSubmit: status }),
  setSubmitting: (status) => set({ isSubmitting: status }),
}));
