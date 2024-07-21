import { Outlet } from "react-router-dom";

import s from "../Layout/Layout.module.scss";

import Header from "../Header/Header";
import Container from "../Container/Container";
import Navigation from "../Navigation/Navigation";

const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <div className={s.wrapper}>
          <Navigation />

          <Outlet />
        </div>
      </Container>
    </>
  );
};
export default Layout;
