import { PropChildren } from "../../types/types";
import s from "../Section/Section.module.scss";

const Section = ({ children }: PropChildren) => {
  return <section className={s.section}>{children}</section>;
};

export default Section;
