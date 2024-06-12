import "./App.css";
import MainPage from "./pages/MainPage";
import ItemPage from "./pages/ItemPage";
import Layout from "./components/Layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/item/:country/:city/:id" element={<ItemPage />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
