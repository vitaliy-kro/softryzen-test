import { Route, Routes } from "react-router-dom";
import { ROUTER_KEYS } from "./consts";
import { Layout } from "./components/Layout";
import { HomePage } from "pages/HomePage";
import CardInfoPage from "./pages/CardInfoPage";
import { AddCardPage } from "./pages/AddCardPage";
import { EditPage } from "./pages/EditPage";

export const App = () => {
  return (
    <Routes>
      <Route path={ROUTER_KEYS.HOME} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTER_KEYS.CARD_INFO} element={<CardInfoPage />} />
        <Route path={ROUTER_KEYS.ADD_NEW_CARD} element={<AddCardPage />} />
        <Route path={ROUTER_KEYS.EDIT_CARD} element={<EditPage />} />
      </Route>
    </Routes>
  );
};
