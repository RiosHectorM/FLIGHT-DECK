import { create } from 'zustand';

interface CertificatesModalStorage {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCertificatesModal = create<CertificatesModalStorage>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


export default useCertificatesModal;
