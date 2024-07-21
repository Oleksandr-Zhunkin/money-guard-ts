import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";

import s from "../Navigation/Navigation.module.scss";

import HomeIcon from "../Icons/IconHome";
import IconStatistics from "../Icons/IconStatistics";
import IconCurrency from "../Icons/IconCurrency";

import Balance from "../Balance/Balance";
import Currency from "../Currency/Currency";

import useResponse from "../../hooks/useResponse";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
  const [isBalance, setIsBalance] = useState(false);
  const { isMobile } = useResponse();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      return setIsBalance(true);
    }
    setIsBalance(false);
  }, [location.pathname, location]);

  return (
    <div className={s.side_bar}>
      <div className={s.nav_balance}>
        <nav className={s.wrapper}>
          <NavLink to="/" className={buildLinkClass}>
            <div className={s.link_wrap}>
              <HomeIcon title="Home" />
              {!isMobile && <p className={s.text}>Home</p>}
            </div>
          </NavLink>

          <NavLink to="/statistics" className={buildLinkClass}>
            <div className={s.link_wrap}>
              <IconStatistics title="Statistics" />
              {!isMobile && <p className={s.text}>Statistics</p>}
            </div>
          </NavLink>

          {isMobile && (
            <NavLink to="/currency" className={buildLinkClass}>
              <IconCurrency title="Currency" />
            </NavLink>
          )}
        </nav>
        {isBalance && <Balance />}
      </div>
      {!isMobile && <Currency />}
    </div>
  );
};
export default Navigation;
