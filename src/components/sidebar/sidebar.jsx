import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import style from './sidebar.module.scss';

export default function SideBar() {
    const [tab, setTab] = useState('');
    const location = useLocation();

    const getActiveTab = (pathname) => {
        if (pathname === '/') {
            setTab('products');
        } else if (pathname === '/discount') {
            setTab('discount');
        } else if (pathname === '/costumers') {
            setTab('costumers');
        } else if (pathname === '/orders') {
            setTab('orders');
        } else if (pathname === '/statistic') {
            setTab('statistic');
        }
    };

    useEffect(() => {
        getActiveTab(location.pathname);
    }, [location.pathname]); 

    return (
        <aside className={style.sidebar}>
            <Link className={style.sidebar__link} to={'/'}>ADMIN PANEL</Link>

            <ul className={style.sidebar__list}>
                <li className={tab === 'products' ? style.active__item : style.list__item}>
                    <Link className={style.item__link} to={'/'}>Mahsulotlar</Link>
                </li>
                <li className={tab === 'discount' ? style.active__item : style.list__item}>
                    <Link className={style.item__link} to={'/discount'}>Chegirmalar</Link>
                </li>
                <li className={tab === 'costumers' ? style.active__item : style.list__item}>
                    <Link className={style.item__link} to={'/costumers'}>Xaridorlar</Link>
                </li>
                <li className={tab === 'orders' ? style.active__item : style.list__item}>
                    <Link className={style.item__link} to={'/orders'}>Buyurtmalar</Link>
                </li>
                <li className={tab === 'statistic' ? style.active__item : style.list__item}>
                    <Link className={style.item__link} to={'/statistic'}>Statistika</Link>
                </li>
            </ul>
        </aside>
    );
}
