import { FC, useContext, useEffect, useState } from 'react';
import { Context } from "./main";
import { observer } from "mobx-react-lite";

import SideBar from './components/sidebar/SideBar';
import Navbar from './components/navbar/Navbar';
import ProductsPage from './pages/products-page/products-page';
import AuthPage from './pages/auth-page/auth-page';
import DiscountPage from './pages/discount-page/DiscountPage';
import CostumersPage from './pages/costumers-page/CostumersPage';
import OrdersPage from './pages/orders-page/OrdersPage';


const App: FC = () => {
    const { store } = useContext(Context);
    const [isVisible, setVisibles] = useState<boolean>(false);
    const [mainStyle, setMainStyle] = useState<boolean>(false);
    const [mainStyles, setMainStyles] = useState({ marginLeft: '375px', marginTop: '30px' });
    const [tab, selectTab] = useState(localStorage.getItem('tab'))

    const setTab = (newTab: string) => {
        localStorage.setItem('tab', newTab)
        selectTab(localStorage.getItem('tab'))
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    const toggleSidebar = () => {
        setVisibles(!isVisible);
        setMainStyle(!mainStyle)
        if (!mainStyle) {
            setMainStyles({ marginLeft: '0px', marginTop: '30px' });
        } else {
            setMainStyles({ marginLeft: '375px', marginTop: '30px' });
        }
    }

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    if (!store.isAuth) {
        return (<AuthPage />);
    } else {
        return <div className="wrapper">
            <SideBar isVisible={isVisible} setTab={setTab} tab={tab} />
            <Navbar toggleSidebar={toggleSidebar} isVisible={isVisible} />
            <main style={mainStyles}>
                {
                    tab == 'products' ? <ProductsPage /> : ''
                }
                {
                    tab == 'discounts' ? <DiscountPage /> : ''
                }
                {
                    tab == 'costumers' ? <CostumersPage /> : ''
                }
                 {
                    tab == 'orders' ? <OrdersPage /> : ''
                }
            </main>
        </div>
    }
};

export default observer(App);
