import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';

const ModalContainer = styled.div`
  width: 500px;
  display: ${(props) => (props.isOpen === 'true' ? 'none' : 'block')};
  width: 100%;
  border: 1px solid #f0f0f0;
  background: #f9f9f9;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.6);
`;

const ModalWrapper = styled.div`
  /* Add your modal styles here */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  /* Add your modal content styles here */
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
`;

const CustomModal = ({ isModalOpen, isOpen, onClosed, modalContent }) => {

    return isModalOpen ? (
        <>

            <ModalContainer isTrue={isModalOpen.toString()} >
                <ModalWrapper>
                    <OutsideClickHandler onOutsideClick={onClosed}>
                        <ModalContent>
                            <CloseButton onClick={onClosed}>
                                <CloseIcon />
                            </CloseButton>
                            <h2 >{modalContent}</h2>
                            {/* <button onClick={onClosed}>Close</button> */}
                        </ModalContent>
                    </OutsideClickHandler>
                </ModalWrapper>
            </ModalContainer>
        </>
    ) : null
}

export default CustomModal