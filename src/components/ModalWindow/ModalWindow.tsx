import Modal from "react-modal";
import s from "./ModalWindow.module.scss";

import { ReactNode, useEffect } from "react";

Modal.setAppElement("#root");

interface PropModal {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalWindow = ({ children, isOpen, onClose }: PropModal) => {
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
