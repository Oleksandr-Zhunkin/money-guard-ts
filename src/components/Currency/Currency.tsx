import { useEffect } from "react";
import useResponse from "../../hooks/useResponse";
import desktopImage from "../../images/currency/currency-dekstop@1x.webp";
import tabletImage from "../../images/currency/currency-tablet@1x.webp";
import mobileImage from "../../images/currency/currency-mobile@1x.webp";
import s from "./Currency.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { monoThunk } from "../../redux/currency/operations";
import { selectData, selectMono } from "../../redux/currency/selectors";

interface CurrencyRate {
  rateBuy: number;
  rateSell: number;
}

interface CurrencyState {
  currency: CurrencyRate[];
  dataFetch: number | null;
}

const Currency = () => {
  const { isMobile, isTablet, isDesktop } = useResponse();
  const dispatch = useDispatch();

  const currency = useSelector(
    (state: { currency: CurrencyState }) => state.currency.currency
  );
  const dataFetch = useSelector(
    (state: { currency: CurrencyState }) => state.currency.dataFetch
  );

  useEffect(() => {
    const currentData = Date.now();
    if (
      !currency.length ||
      (dataFetch !== null && currentData - dataFetch > 360000)
    ) {
      dispatch(monoThunk());
    }
  }, [currency, dataFetch, dispatch]);

  if (!currency.length) {
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
        {currency.map((rate: CurrencyRate, index: number) => (
          <div key={index} className={s.valueContainer}>
            <p>{index === 0 ? "USD" : "EUR"}</p>
            <p>{rate.rateBuy.toFixed(2)}</p>
            <p>{rate.rateSell.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <img className={s.image} src={getImage()} alt="Currency stats" />
    </div>
  );
};

export default Currency;
