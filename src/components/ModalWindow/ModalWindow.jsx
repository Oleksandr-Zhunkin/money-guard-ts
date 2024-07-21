import Modal from "react-modal";
import s from "./ModalWindow.module.scss";

import { useEffect } from "react";

Modal.setAppElement("#root");

const ModalWindow = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={s.modal}
        closeTimeoutMS={250}
        overlayClassName={s.overlay}
        contentLabel="Example Modal"
      >
        {children}
      </Modal>
    </div>
  );
};
export default ModalWindow;
