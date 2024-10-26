import { useState } from "react";

type UseModalProps = [
  isModalOpen: boolean,
  openModal: () => void,
  closeModal: () => void,
];

export const useModal = (): UseModalProps => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  return [isModalOpen, openModal, closeModal];
};
