import { FallingLines } from "react-loader-spinner";

import s from "./Loader.module.scss";

interface FallingLinesProps {
  color: string;
  width: string;
  visible: boolean;
  ariaLabel: string;
  wrapperClass: string;
}

export default function Loader() {
  const loaderProps: FallingLinesProps = {
    color: "#FFFFFF",
    width: "100",
    visible: true,
    ariaLabel: "falling-circles-loading",
    wrapperClass: s.loader,
  };
  return (
    <div className={s.wrapper}>
      <FallingLines {...loaderProps} />
    </div>
  );
}
