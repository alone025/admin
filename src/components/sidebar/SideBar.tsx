import React from 'react';
import { Link } from "react-router-dom";
import style from './sidebar.module.scss';

export default function SideBar({ isVisible, setTab, tab, setvisible }: { setvisible: any, isVisible: boolean, setTab: any, tab: string | null }) {

    const changeTab = (e: React.MouseEvent<HTMLButtonElement>) => {
        const tab = e.currentTarget.getAttribute('data-page');
        setTab(tab)
    }

    return (
        <aside className={`${style.sidebar} ${isVisible ? style.visible : ''} `}>
            <Link className={style.sidebar__link} to={'/'}>ADMIN PANEL <span onClick={()=>{setvisible(true)}}>&times;</span> </Link>

            <ul className={style.sidebar__list}>
                <li className={tab == 'products' ? style.active__item : style.list__item}>
                    <button onClick={(e) => changeTab(e)} data-page="products" className={style.item__link}>Mahsulotlar</button>
                </li>
                <li className={tab == 'discounts' ? style.active__item : style.list__item} >
                    <button onClick={(e) => changeTab(e)} data-page="discounts" className={style.item__link}>Chegirmalar</button>
                </li>
                <li className={tab == 'costumers' ? style.active__item : style.list__item} >
                    <button onClick={(e) => changeTab(e)} data-page="costumers" className={style.item__link}>Xaridorlar</button>
                </li>
                <li className={tab == 'orders' ? style.active__item : style.list__item}  >
                    <button onClick={(e) => changeTab(e)} data-page="orders" className={style.item__link}>Buyurtmalar</button>
                </li>
                <li className={tab == 'analitics' ? style.active__item : style.list__item}>
                    <button onClick={(e) => changeTab(e)} data-page="analitics" className={style.item__link}>Statistika</button>
                </li>
                <li className={tab == 'history' ? style.active__item : style.list__item}>
                    <button onClick={(e) => changeTab(e)} data-page="history" className={style.item__link}>Tarix</button>
                </li>
            </ul>
        </aside>
    );
}
