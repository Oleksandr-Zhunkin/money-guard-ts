import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.scss";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import Statistics from "./pages/Statistics/Statistics";
import CurrencyTab from "./pages/CurrencyTab/CurrencyTab";

import Section from "./components/Section/Section";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import Loader from "./components/Loader/Loader";
import NotFound from "./components/NotFound/NotFound";

import { refreshThunk } from "./redux/auth/operations";
import { selectIsRefresh } from "./redux/auth/selectors";
import useResponse from "./hooks/useResponse";
import { categoriesThunk } from "./redux/categories/operations";
import { AppDispatch } from "./redux/store";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefresh);
  const { isMobile } = useResponse();

  useEffect(() => {
    dispatch(refreshThunk());
    dispatch(categoriesThunk());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Section>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="statistics" element={<Statistics />} />
          <Route
            path="currency"
            element={isMobile ? <CurrencyTab /> : <Navigate to="/" />}
          />
        </Route>
        <Route
          path="/login"
          element={
            <RestrictedRoute>
              <LoginPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute>
              <RegisterPage />
            </RestrictedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--color-text",
            padding: "16px",
            color: "#000",
            fontWeight: "normal",
            fontSize: "16px",
          },
          duration: 3000,
        }}
      />
    </Section>
  );
}

export default App;
