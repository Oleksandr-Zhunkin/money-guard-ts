import { FallingLines } from "react-loader-spinner";
import s from "./Loader.module.scss";

interface LoaderProps {
  color?: string;
  width?: string;
}

function Loader({ color = "#FFFFFF", width = "100" }: LoaderProps) {
  return (
    <div className={s.wrapper}>
      <FallingLines color={color} width={width} visible={true} />
    </div>
  );
}

export default Loader;
