import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

import s from "./Header.module.scss";
import Logo from "../../images/icons/logo.svg";
import exitIcon from "../../images/icons/exit-icon.svg";

import Logout from "../Logout/Logout";
import Container from "../Container/Container";

import useResponse from "../../hooks/useResponse";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const { isTablet } = useResponse();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };
  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    isLoggedIn && (
      <>
        <header className={s.header}>
          <Container>
            <div className={s.wrapper}>
              <Link to="/" className={s.left_side}>
                <img className={s.logo_icon} src={Logo} alt="logo" />
                <p className={s.logo_text}>Money Guard</p>
              </Link>

              <div className={s.right_side}>
                <p className={s.user}>{user.username}</p>
                <button
                  onClick={handleModalOpen}
                  className={s.exit_btn}
                  type="button"
                >
                  <img className={s.exit_icon} src={exitIcon} alt="exit" />
                  {isTablet && <p className={s.exit_text}>Exit</p>}
                </button>
              </div>
            </div>
          </Container>
        </header>
        <Logout
          modalIsOpen={modalIsOpen}
          handleModalOpen={handleModalOpen}
          handleModalClose={handleModalClose}
        />
      </>
    )
  );
};
export default Header;
