import React from 'react';

interface ModalProps {
  isOpen: boolean | undefined;
  onClose: () => void;
  sendData: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen, 
  onClose, 
  title, 
  children, 
  sendData, 
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose} className="modal-close-button">
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button onClick={sendData} className="modal-close-button-footer">
            Qo'shish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
