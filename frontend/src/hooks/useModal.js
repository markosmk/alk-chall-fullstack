import { useState } from 'react';

export const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState(initialMode);
  const toggle = () => setModalOpen(!modalOpen);
  return [modalOpen, setModalOpen, toggle];
};

export const useModalWithData = (initialMode = false, initialData = null) => {
  const [modalOpen, setModalOpen] = useModal(initialMode);
  const [data, setData] = useState(initialData);

  const setModalState = (state) => {
    setModalOpen(state);
    if (state === false) {
      setTimeout(() => {
        setData(null);
      }, 200);
    }
  };

  return { setModalState, modalOpen, data, setData };
};
