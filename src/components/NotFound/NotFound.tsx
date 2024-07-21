import { Link } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

import s from "../NotFound/NotFound.module.scss";
import mobNotFound from "../../images/notFound/mob-notFound.png";
import descNotFound from "../../images/notFound/desk-notFound.png";
import useResponse from "../../hooks/useResponse";

export const NotFound = () => {
  const { isMobile } = useResponse();

  return (
    <>
      <div>
        <Link to="/" className={s.go_back}>
          <MdOutlineKeyboardBackspace className={s.icon} />
          Go Home
        </Link>

        <img
          className={s.image}
          src={isMobile ? mobNotFound : descNotFound}
          alt="not found page"
        />
      </div>
    </>
  );
};
export default NotFound;
