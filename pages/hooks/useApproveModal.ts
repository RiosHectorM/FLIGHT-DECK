import { create } from 'zustand';

interface ApproveModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useApproveModal = create<ApproveModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


export default useApproveModal;
