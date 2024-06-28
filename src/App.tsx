import { FC, useContext, useEffect, useState } from "react";
import { Context } from "./main";
import { observer } from "mobx-react-lite";

import SideBar from "./components/sidebar/SideBar";
import Navbar from "./components/navbar/Navbar";
import ProductsPage from "./pages/products-page/products-page";
import AuthPage from "./pages/auth-page/auth-page";
import DiscountPage from "./pages/discount-page/DiscountPage";
import CostumersPage from "./pages/costumers-page/CostumersPage";
import OrdersPage from "./pages/orders-page/OrdersPage";
import AnalysPage from "./pages/analys-page/analys-page";
import HistoryPage from "./pages/history-page/history-page";
import CreateAdminPage from "./pages/createAdmin-page/createAdminPage";
import CreateAdminService from "./services/createAdminService";

const App: FC = () => {
  const { store } = useContext(Context);
  const [isVisible, setVisibles] = useState<boolean>(false);
  const [mainStyle, setMainStyle] = useState<boolean>(false);
  const [mainStyles, setMainStyles] = useState("main-div-class");
  const [tab, selectTab] = useState(localStorage.getItem("tab"));

  const setTab = (newTab: string) => {
    localStorage.setItem("tab", newTab);
    selectTab(localStorage.getItem("tab"));
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
      console.log("app",localStorage.getItem("token"));
    }
    localStorage.setItem("tab", "products");
    CreateAdminService.getAdmins().then(e =>{ console.log(e.data)
    localStorage.setItem("admins-list-525", e.data)}
    )

  }, []);

  const toggleSidebar = () => {
    setVisibles(!isVisible);
    setMainStyle(!mainStyle);
    if (!mainStyle) {
      setMainStyles("main-div-class-active");
    } else {
      setMainStyles("main-div-class");
    }
  };

  if (store.isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!store.isAuth) {
    return <AuthPage />;
  } else {
    return (
      <div className="wrapper">
        <SideBar
          isVisible={isVisible}
          setvisible={setVisibles}
          setTab={setTab}
          tab={tab}
        />
        <Navbar toggleSidebar={toggleSidebar} isVisible={isVisible} />
        <main className={mainStyles}>
          {tab == "products" ? <ProductsPage /> : ""}
          {tab == "discounts" ? <DiscountPage /> : ""}
          {tab == "costumers" ? <CostumersPage /> : ""}
          {tab == "orders" ? <OrdersPage /> : ""}
          {tab == "analitics" ? <AnalysPage /> : ""}
          {tab == "history" ? <HistoryPage /> : ""}
          {tab == "admin" ? <CreateAdminPage /> : ""}
        </main>
      </div>
    );
  }
};

export default observer(App);
