import { useEffect } from "react";
import useResponse from "../../hooks/useResponse";

import desktopImage from "../../images/currency/currency-dekstop@1x.webp";
import tabletImage from "../../images/currency/currency-tablet@1x.webp";
import mobileImage from "../../images/currency/currency-mobile@1x.webp";

import s from "./Currency.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { monoThunk } from "../../redux/currency/operations";
import { selectData, selectMono } from "../../redux/currency/selectors";

const Currency = () => {
  const { isMobile, isTablet, isDesktop } = useResponse();
  const dispatch = useDispatch();
  const currency = useSelector(selectMono);
  const dataFetch = useSelector(selectData);

  useEffect(() => {
    const currentData = Date.now();
    if (currency.length === 0) {
      dispatch(monoThunk());
      return;
    }

    if (currentData - dataFetch > 360000) {
      dispatch(monoThunk());
    }
  }, [currency.length, dataFetch, dispatch]);

  if (!currency) {
    return <div>No currency data available.</div>;
  }

  const getImage = () => {
    if (isDesktop) return desktopImage;
    if (isTablet) return tabletImage;
    if (isMobile) return mobileImage;
    return desktopImage;
  };

  return (
    <div className={s.wrapperCurrency}>
      <div className={s.headCurrency}>
        <p className={s.currency}>Currency</p>
        <p className={s.purchase}>Purchase</p>
        <p className={s.sale}>Sale</p>
      </div>
      <div className={s.valueWrapper}>
        <div className={s.valueContainer}>
          <p>USD</p>
          <p>{currency?.[0]?.rateBuy.toFixed(2) || ""}</p>
          <p>{currency?.[0]?.rateSell.toFixed(2) || ""}</p>
        </div>
        <div className={s.valueContainer}>
          <p>EUR</p>
          <p>{currency?.[1]?.rateBuy.toFixed(2) || ""}</p>
          <p>{currency?.[1]?.rateSell.toFixed(2) || ""}</p>
        </div>
      </div>
      <img className={s.image} src={getImage()} alt="stats" />
    </div>
  );
};

export default Currency;
