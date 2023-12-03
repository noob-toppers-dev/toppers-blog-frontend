import React, { useState } from 'react'

const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const open = (content) => {
        setIsModalOpen(true);
        setModalContent(content);
    }
    const close = () => {
        setIsModalOpen(false);
        setModalContent(null);
    }

    return { open, close, isModalOpen, modalContent }
}

export default useModal;