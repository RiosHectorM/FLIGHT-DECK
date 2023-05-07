import { create } from "zustand";

interface SelectFlightInstructorModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSelectFlightInstructorModal = create<SelectFlightInstructorModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useSelectFlightInstructorModal;
