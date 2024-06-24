import ProductService from '../../services/ProductService';
import EditModal from '../UI/edit-modal/EditModal';
import ProductsEditForm from './components/products-edit';
import styles from './products-table.module.scss';
import { ChangeEvent, useState } from 'react';

export default function ProductsTable({ data }: { data: any }) {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // ru
    const [ruName, setRuName] = useState<string>('');
    const [ruDescription, setRuDescription] = useState<string>('');

    const [category, setCategory] = useState<any>([]);
    const [subCategory, setSubCategory] = useState<any>([]);
    const [categories, setCategories] = useState<any>([]);
    const [subCategories, setSubCategories] = useState<any>([]);
    const [product, setProduct] = useState<any>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const deleteProduct = (event: any) => {
        const id = event.target.getAttribute('data-id');
        ProductService.deleteProduct(id).then(() => { window.location.href = '/' });
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setSelectedFile(file);

            const reader = new FileReader();
            reader.readAsDataURL(file);
        }
    };

    const handleEditButton = async (event: any) => {
        const id = event.target.getAttribute('data-id');
        const product = await ProductService.getProduct(id);
        const categoriesRes = await ProductService.getCategories();
        const subCategoriesRes = await ProductService.getSubCategories();
        setName(product.data.uz.name);
        setDescription(product.data.uz.description);
        setRuName(product.data.ru.description);
        setRuDescription(product.data.ru.description);
        setCategory(product.data.category);
        setSubCategory(product.data.subCategory);
        setPrice(product.data.price);
        setCategories(categoriesRes.data);
        setSubCategories(subCategoriesRes.data);
        setProduct(product.data);
        openModal();
    }

    const handleEdit = () => {
        ProductService.updateProduct(
            product._id,
            name,
            description,
            ruName,
            ruDescription,
            category,
            subCategory,
            price,
            selectedFile
        ).then(() => {
            window.location.href='/';
        });
    }

    if (!Array.isArray(data)) {
        return <div>Error: Invalid data format.</div>;
    }

    return (
        <div className={styles.tableContainer}>
            <div className={styles.table__filter}>
                <input className={styles.search} type="text" placeholder='Mahsulot nomini yozing...' />
                <select className={styles.select}>
                    <option selected disabled>Kategoriya tanlang</option>
                    <option value="1">Oshxona jihozlar</option>
                    <option value="2">Elektron jihozlar</option>
                    <option value="3">Kiyimlar</option>
                </select>
                <select className={styles.select}>
                    <option selected disabled>Sub-Kategoriya</option>
                    <option value="1">Oshxona jihozlar</option>
                    <option value="2">Elektron jihozlar</option>
                    <option value="3">Kiyimlar</option>
                </select>
            </div>
            <table className={styles.responsiveTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Mahsulot nomi</th>
                        <th>Kategoriyasi</th>
                        <th>Sub-Kategoriyasi</th>
                        <th>Harakatlar</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any, index: number) => (
                        console.log('Product', item.uz),
                        <tr key={item.id}>
                            <td data-label="ID">{index + 1}</td>
                            <td data-label="Name">{item.uz.name}</td>
                            <td data-label="Category">{item.category.uz.name}</td>
                            <td data-label="SubCategory">{item.subCategory.uz.name}</td>
                            <td style={{ display: 'flex', gap: '5px' }} data-label="Actions">
                                <button className='button secondary' onClick={deleteProduct} data-id={item._id}>O'chirish</button>
                                <button className='button primary' onClick={handleEditButton} data-id={item._id}>Tahrirlash</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <EditModal sendData={handleEdit} isOpen={isModalOpen} onClose={closeModal} title='Sub Kategoriya tahrirlang'>
                <ProductsEditForm
                    setName={setName}
                    name={name}
                    setDescription={setDescription}
                    description={description}
                    setRuName={setRuName}
                    ruName={ruName}
                    setRuDescription={setRuDescription}
                    ruDescription={ruDescription}
                    setPrice={setPrice}
                    price={price}
                    setCategory={setCategory}
                    category={category}
                    setSubCategory={setSubCategory}
                    subCategory={subCategories}
                    handleFileChange={handleFileChange}
                    selectedFile={selectedFile}
                    subCategories={subCategories}
                    categories={categories}
                />
            </EditModal>
        </div>
    );
}
