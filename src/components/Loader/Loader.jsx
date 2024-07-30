import { FallingLines } from "react-loader-spinner";

import s from "./Loader.module.scss";

export default function Loader() {
  return (
    <div className={s.wrapper}>
      <FallingLines
        color="#FFFFFF"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
        wrapperClass={s.loader}
      />
    </div>
  );
}
