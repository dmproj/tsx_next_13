import { create } from "zustand";

import axios from "axios";

interface RegisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => any
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
