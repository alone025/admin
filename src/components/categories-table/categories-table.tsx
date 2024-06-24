import { useState } from 'react';
import ProductService from '../../services/ProductService';
import EditModal from '../UI/edit-modal/EditModal';
import CategoryEditForm from './components/edit-form';
import styles from './categories.module.scss';

export default function CategoriesTable({ data }: any) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [categoryName, setCategoryName] = useState<string>('');

    const [categoryRuName, setCategoryRuName] = useState<string>('');
    const [category, setCategory] = useState<any>();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);



    const deleteCategory = (event: any) => {
        const id = event.target.getAttribute('data-id');
        ProductService.deleteCategory(id).then(() => window.location.href = '/');
    }

    const handleEditButton = async (event: any) => {
        const id = event.target.getAttribute('data-id');
        const response = await ProductService.getCategory(id);
        const data = response.data;
        setCategory(data.category);
        setCategoryName(data.category.uz.name);
        setCategoryRuName(data.category.ru.name);
        openModal();
    }

    const handleEdit = () => {
        ProductService.updateCategory(category?._id, { uz: { name: categoryName }, ru: { name: categoryRuName } })
            .then((data) => {
                console.log(data);
                closeModal();
                window.location.href = '/';
            });
    }

    return <div className={styles.tableContainer}>
        <input className={styles.search} type="text" placeholder='Kategoriya nomini yozing... ' />
        <table className={styles.responsiveTable}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Kategoriya nomi</th>
                    <th>Harakatlar</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item: any, index: number) => (
                    <tr key={index + 1}>
                        <td data-label="ID">{index + 1}</td>
                        <td data-label="Name">{item.uz.name}</td>
                        <td style={{ display: 'flex', gap: '5px' }} data-label="Name">
                            <button data-id={item._id} className='button secondary' onClick={(e) => deleteCategory(e)} >O'chirish</button>
                            <button data-id={item._id} className='button primary' onClick={(e) => handleEditButton(e)}>Tahrirlash</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <EditModal sendData={handleEdit} isOpen={isModalOpen} onClose={closeModal} title='Kategoriyani tahrirlang'>
            <CategoryEditForm categoryName={categoryName} categoryRuName={categoryRuName} setCategoryName={setCategoryName} setCategoryRuName={setCategoryRuName} />
        </EditModal>
    </div>
}