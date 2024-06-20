import style from './products-page.module.scss';

import { Link } from "react-router-dom";
import CategoriesTable from '../../components/categories-table/categories-table';
import SubCategoriesTable from '../../components/subcategories-table/subcategories-table';
import ProductsTable from '../../components/products-table/products-tabe';
import { useState } from 'react';

export default function ProductsPage() {
    const [tab, setTab] = useState('categories');

    return <section className={style.products}>
        <div className={style.products__head}>
            <h1>BO'LIMLARDAN BIRINI TANLANG: </h1>

            <div className={style.products__categories}>
                <ul className={style.head__list}>
                    <li onClick={() => setTab('categories')}  className={tab == 'categories' ? style.active__item : style.list__item}><Link className={style.item__link} to={'#'}>Kategoriyalar</Link></li>
                    <li onClick={() => setTab('sub-categories')} className={tab == 'sub-categories' ? style.active__item : style.list__item}><Link className={style.item__link} to={'#'}>Sub-Kategoriyalar</Link></li>
                    <li onClick={() => setTab('products')} className={tab == 'products' ? style.active__item : style.list__item}><Link className={style.item__link} to={'#'}>Mahsulotlar</Link></li>
                </ul>

                <button className='button primary' style={{ height: '50px', width: '200px' }} >Qo'shish</button>
            </div>
        </div>

        {
            tab=='categories' ? <CategoriesTable/> : ''
        }
        {
            tab=='sub-categories' ? <SubCategoriesTable/> : ''
        }
        {
            tab=='products' ? <ProductsTable/> : ''
        }



    </section>
}