import style from './products-page.module.scss';

import { Link } from "react-router-dom";
import CategoriesTable from '../../components/categories-table/categories-table';
import SubCategoriesTable from '../../components/subcategories-table/subcategories-table';
import ProductsTable from '../../components/products-table/products-table';
import ProductsModal from '../../components/products-modal/products-modal';
import {  useEffect, useState } from 'react';
import ProductService from '../../services/ProductService';

interface SubCategory {
    _id: string;
    uz: { name: string };
    ru: { name: string };
    category: { _id: string; uz: { name: string } };
    categoryId: string | null
  }
  

export default function ProductsPage() {
    const [tab, setTab] = useState<string>('categories');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [products, setProducts] = useState([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        ProductService.getCategories().then(data => setCategories(data.data));
        ProductService.getSubCategories().then(data => setSubCategories(data.data));      
        ProductService.getProducts().then(data => {
            console.log(data.data)
            setProducts(data.data)
        });      
    }, []) 


    
    

    return <section className={style.products}>
        <div className={style.products__head}>
            <h1>BO'LIMLARDAN BIRINI TANLANG: </h1>

            <ProductsModal setTab={setTab} tab={tab} categories={categories} subCategories={subCategories} isModalOpen={isModalOpen} closeModal={closeModal} />

            <div className={style.products__categories}>
                <ul className={style.head__list}>
                    <li onClick={() => setTab('categories')} className={tab == 'categories' ? style.active__item : style.list__item}><Link className={style.item__link} to={'#'}>Kategoriyalar</Link></li>
                    <li onClick={() => setTab('sub-categories')} className={tab == 'sub-categories' ? style.active__item : style.list__item}><Link className={style.item__link} to={'#'}>Sub-Kategoriyalar</Link></li>
                    <li onClick={() => setTab('products')} className={tab == 'products' ? style.active__item : style.list__item}><Link className={style.item__link} to={'#'}>Mahsulotlar</Link></li>
                </ul>

                <button onClick={openModal} className='button primary' >Qo'shish</button>
            </div>
        </div>

        {
            tab == 'categories' ? <CategoriesTable data={categories} /> : ''
        }
        {
            tab == 'sub-categories' ? <SubCategoriesTable setSubCategories={setSubCategories} data={subCategories} /> : ''
        }
        {
            tab == 'products' ? <ProductsTable data={products} /> : ''
        }



    </section>
}