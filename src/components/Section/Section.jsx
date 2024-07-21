import s from "../Section/Section.module.scss";

const Section = ({ children }) => {
  return <section className={s.section}>{children}</section>;
};

export default Section;
