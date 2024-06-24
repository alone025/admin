import ProductService from '../../services/ProductService';
import { useState } from 'react';
import styles from './subcategories-table.module.scss'
import EditModal from '../UI/edit-modal/EditModal';
import SubCategoryEditForm from './components/subcategories-edit';

export default function SubCategoriesTable({ data, setSubCategories }: any) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [subCategoryName, setSubCategoryName] = useState<string>('');
    const [subCategoryRuName, setSubCategoryRuName] = useState<string>('');
    const [subCategory, setSubCategory] = useState<any>();
    const [category, setCategory] = useState<any>();
    const [categories, setCategories] = useState<any>([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const deleteSubCategory = (event: any) => {
        const id = event.target.getAttribute('data-id');
        ProductService.deleteSubCategory(id).then(() => { window.location.href = '/' });
    }

    const handleEditButton = async (event: any) => {
        const id = event.target.getAttribute('data-id');
        const response = await ProductService.getSubCategory(id);
        const categories = await ProductService.getCategories();

        const data = response.data;
        console.log(data.subCategory);
        setSubCategory(data.subCategory);
        setCategories(categories.data);
        setSubCategoryName(data.subCategory.uz.name);
        setSubCategoryRuName(data.subCategory.ru.name);
        openModal();
    }

    const handleEdit = () => {
        ProductService.updateSubCategory(subCategory._id, {
            uz: { name: subCategoryName },
            ru: { name: subCategoryRuName },
            category: category
        }).then(async () => {
            const subCategories = await ProductService.getSubCategories();            
            setSubCategories(subCategories.data);
            closeModal();
        });
    }

    return <div className={styles.tableContainer}>
        <div className={styles.table__filter}>
            <input className={styles.search} type="text" placeholder='Sub kategoriya nomini yozing... ' />
            <select className={styles.select}>
                <option selected disabled>Kategoriya tanlang</option>
                <option value="1">Oshxona jihozlar</option>
                <option value="2">Elektron jihozlar</option>
                <option value="3">Kiyimlar</option>
            </select>
        </div>
        <table className={styles.responsiveTable}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Sub-Kategoriya nomi</th>
                    <th>Kategoriyasi</th>
                    <th>Harakatlar</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item: any, index: number) => (
                    <tr key={item._id}>
                        <td data-label="ID">{index + 1}</td>
                        <td data-label="Name">{item.uz.name}</td>
                        <td data-label="Name">{item.category.uz.name}</td>
                        <td style={{ display: 'flex', gap: '5px' }} data-label="Name">
                            <button className='button secondary' onClick={deleteSubCategory} data-id={item._id} >O'chirish</button>
                            <button className='button primary' data-id={item._id} onClick={handleEditButton}>Tahrirlash</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <EditModal sendData={handleEdit} isOpen={isModalOpen} onClose={closeModal} title='Sub Kategoriya tahrirlang'>
            <SubCategoryEditForm
                setSubCategoryName={setSubCategoryName}
                setSubCategoryRuName={setSubCategoryRuName}
                setCategory={setCategory}
                subCategoryName={subCategoryName}
                subCategoryRuName={subCategoryRuName}
                categories={categories}
            />
        </EditModal>

    </div>
}