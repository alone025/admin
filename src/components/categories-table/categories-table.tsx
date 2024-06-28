import { useEffect, useState } from 'react';
import ProductService from '../../services/ProductService';
import EditModal from '../UI/edit-modal/EditModal';
import CategoryEditForm from './components/edit-form';
import styles from './categories.module.scss';
import { CategoriesTableProps, Category, ProductServiceResponse } from '../../models/category';

export default function CategoriesTable({ data }: CategoriesTableProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [categoryName, setCategoryName] = useState<string>('');
    const [categoryRuName, setCategoryRuName] = useState<string>('');
    const [category, setCategory] = useState<Category | null>(null);
    const [filterData, setFilterData] = useState<Category[]>(data);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        setFilterData(data);
    }, [data]);

    const deleteCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.getAttribute('data-id')!;
        ProductService.deleteCategory(id).then(() => window.location.href = '/');
    };

    const handleEditButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.getAttribute('data-id')!;
        const response: ProductServiceResponse = await ProductService.getCategory(id);
        const data = response.data;
        setCategory(data.category);
        setCategoryName(data.category.uz.name);
        setCategoryRuName(data.category.ru.name);
        openModal();
    };

    const handleEdit = () => {
        if (category) {
            ProductService.updateCategory(category._id, { uz: { name: categoryName }, ru: { name: categoryRuName } })
                .then((data) => {
                    console.log(data);
                    closeModal();
                    window.location.href = '/';
                });
        }
    };

    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newSearchData = data.filter((product) =>
            product.uz.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilterData(newSearchData);
    }

    return (
        <div className={styles.tableContainer}>
            <input className={styles.search} type="text" placeholder='Kategoriya nomini yozing...' onChange={handleSearchChange} />
            <table className={styles.responsiveTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Kategoriya nomi</th>
                        <th>Harakatlar</th>
                    </tr>
                </thead>
                <tbody>
                    {filterData.map((item, index) => (
                        <tr key={index + 1}>
                            <td data-label="ID">{index + 1}</td>
                            <td data-label="Name">{item.uz.name}</td>
                            <td style={{ display: 'flex', gap: '5px', justifyContent: "flex-end" }} data-label="Name">
                                <button data-id={item._id} className='button secondary' onClick={deleteCategory}>O'chirish</button>
                                <button data-id={item._id} className='button primary' onClick={handleEditButton}>Tahrirlash</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <EditModal sendData={handleEdit} isOpen={isModalOpen} onClose={closeModal} title='Kategoriyani tahrirlang'>
                <CategoryEditForm categoryName={categoryName} categoryRuName={categoryRuName} setCategoryName={setCategoryName} setCategoryRuName={setCategoryRuName} />
            </EditModal>
        </div>
    );
}
