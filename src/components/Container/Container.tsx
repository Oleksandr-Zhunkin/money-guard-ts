import { PropChildren } from "../../types/types";
import s from "../Container/Container.module.scss";

const Container = ({ children }: PropChildren) => {
  return <div className={s.container}>{children}</div>;
};

export default Container;
