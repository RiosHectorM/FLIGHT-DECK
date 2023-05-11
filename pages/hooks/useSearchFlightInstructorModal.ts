import { create } from "zustand";

interface SearchFlightInstructorModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSearchFlightInstructorModal = create<SearchFlightInstructorModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useSearchFlightInstructorModal;
