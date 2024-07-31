import axios from "axios";

interface CurrencyItem {
  currencyCodeA: number;
  currencyCodeB: number;
  rateSell: number;
  rateBuy: number;
  rateCross: number;
  date: number;
}

interface CachedCurrency {
  date: number;
  usd: CurrencyItem | undefined;
  eur: CurrencyItem | undefined;
}

const apiClient = axios.create({
  baseURL: "https://api.monobank.ua/bank/currency",
});

const fetchCurrencyData = async (): Promise<CurrencyItem[]> => {
  try {
    const response = await apiClient.get<CurrencyItem[]>("");
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch currency data:",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw new Error("Failed to fetch currency data");
  }
};

const getCachedCurrencyData = (): CachedCurrency | null => {
  const cachedCurrency = localStorage.getItem("currency");
  if (cachedCurrency !== null) {
    const parsed = JSON.parse(cachedCurrency) as CachedCurrency;
    if (parsed.date && Date.now() - parsed.date < 3600000) {
      return parsed;
    }
  }
  return null;
};

const cacheCurrencyData = (data: CurrencyItem[]) => {
  const now = Date.now();
  const currencyData: CachedCurrency = {
    date: now,
    usd: data.find(
      (item) => item.currencyCodeA === 840 && item.currencyCodeB === 980
    ),
    eur: data.find(
      (item) => item.currencyCodeA === 978 && item.currencyCodeB === 980
    ),
  };

  localStorage.setItem("currency", JSON.stringify(currencyData));
  return currencyData;
};

const getCurrency = async (): Promise<CachedCurrency> => {
  const cachedCurrency = getCachedCurrencyData();
  if (cachedCurrency) {
    return cachedCurrency;
  }

  const data = await fetchCurrencyData();
  return cacheCurrencyData(data);
};

export default getCurrency;
