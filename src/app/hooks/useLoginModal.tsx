import { create } from "zustand";

import axios from "axios";

interface LoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => any
}

const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
