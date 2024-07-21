import ModalWindow from "../ModalWindow/ModalWindow";
import { useDispatch } from "react-redux";

import s from "./Logout.module.scss";
import Logo from "../../images/icons/logo.svg";

import { logoutThunk } from "../../redux/auth/operations";
import useResponse from "../../hooks/useResponse";

const Logout = ({ modalIsOpen, handleModalClose }) => {
  const dispatch = useDispatch();
  const { isMobile } = useResponse();

  return (
    <ModalWindow isOpen={modalIsOpen} onClose={handleModalClose}>
      <div className={s.box}>
        {!isMobile && (
          <>
            <img src={Logo} alt="logo" className={s.logo} />
            <h4 className={s.title}>Money Guard</h4>
          </>
        )}

        <p className={s.text}>Are you sure you want to log out?</p>
        <button onClick={() => dispatch(logoutThunk())} className={s.logout}>
          logout
        </button>
        <button onClick={handleModalClose} className={s.cancel}>
          cancel
        </button>
      </div>
    </ModalWindow>
  );
};
export default Logout;
