import { useEffect, useState } from 'react'
import styles from './discount-table.module.scss'
import DiscountService from '../../services/DiscountService';
import EditModal from '../UI/edit-modal/EditModal';
import DiscountEditForm from './components/discount-edit';

export default function DiscountsTable({
    setName,
    name,
    setRuName,
    ruName,
    setDescription,
    description,
    setRuDescription,
    ruDescription,
    setPrice,
    price,
    selectedFile,
    handleFileChange
}: any) {
    const [discounts, setDiscounts] = useState<any>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [id, setId] = useState('')

    useEffect(() => {
        DiscountService.allDiscounts().then(data => {
            console.log(data.data.data);

            setDiscounts(data.data.data);
        });
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false)
    };


    const handleDelete = async (event: any) => {
        const id = event.target.getAttribute('data-id');
        await DiscountService.deleteDiscount(id);
        window.location.href = '/'
    }

    const handleEditButton = async (event: any) => {
        const id = event.target.getAttribute('data-id');
        const response = await DiscountService.getDiscount(id);

        setId(id);
        setName(response.data.uz.name);
        setDescription(response.data.uz.description);
        setRuName(response.data.ru.name);
        setRuDescription(response.data.ru.description);
        setPrice(response.data.price);
        openModal();
    }

    console.log('ss1', {
        uzName: name,
        uzDescription: description,
        ruName: ruName,
        ruDescription: ruDescription,
        price: price,
        photo: selectedFile ? selectedFile : null
    });

    const data = {
        uzName: name,
        uzDescription: description,
        ruName: ruName,
        ruDescription: ruDescription,
        price: price,
        photo: selectedFile ? selectedFile : null
    }
    

    const handleEdit = () => {
        DiscountService.editDiscount(id, data).then(data => {
            window.location.href='/'
        })
    }

    return <div className={styles.tableContainer}>
        <div className={styles.table__filter}>
            <input className={styles.search} type="text" placeholder='Chegirma nomini yozing ...' />
        </div>
        <table className={styles.responsiveTable}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Chegirma nomi</th>
                    <th>Chegirma narxi</th>
                    <th>Harakatlar</th>
                </tr>
            </thead>
            <tbody>
                {discounts.map((item: any, index: number) => (
                    <tr key={item.id}>
                        <td data-label="ID">{index + 1}</td>
                        <td data-label="Name">{item.uz.name}</td>
                        <td data-label="Name">{item.price}</td>
                        <td style={{ display: 'flex', gap: '5px' }} data-label="Name">
                            <button onClick={handleDelete} data-id={item._id} className='button secondary' >O'chirish</button>
                            <button onClick={handleEditButton} data-id={item._id} className='button primary'>Tahrirlash</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <EditModal sendData={handleEdit} isOpen={isModalOpen} onClose={closeModal} title='Chegirmalarni tahrirlang'>
            <DiscountEditForm
                setName={setName}
                name={name}
                setRuName={setRuName}
                ruName={ruName}
                setDescription={setDescription}
                description={description}
                setRuDescription={setRuDescription}
                ruDescription={ruDescription}
                setPrice={setPrice}
                price={price}
                handleFileChange={handleFileChange}
            />
        </EditModal>
    </div>
}