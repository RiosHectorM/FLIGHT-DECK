import { create } from 'zustand';

interface YouCantCertifyModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useYouCantCertifyModal = create<YouCantCertifyModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useYouCantCertifyModal;
