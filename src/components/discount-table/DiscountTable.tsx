import { useEffect, useState } from 'react';
import styles from './discount-table.module.scss';
import DiscountService from '../../services/DiscountService';
import EditModal from '../UI/edit-modal/EditModal';
import DiscountEditForm from './components/discount-edit';

interface Discount {
    id: string;
    uz: {
        name: string;
        description: string;
    };
    ru: {
        name: string;
        description: string;
    };
    price: string;
}

interface DiscountsTableProps {
    setName: (name: string) => void;
    name: string;
    setRuName: (ruName: string) => void;
    ruName: string;
    setDescription: (description: string) => void;
    description: string;
    setRuDescription: (ruDescription: string) => void;
    ruDescription: string;
    setPrice: (price: string) => void;
    price: string;
    selectedFile: File | null;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

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
}: DiscountsTableProps) {
    const [discounts, setDiscounts] = useState<Discount[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [id, setId] = useState<string>('');

    useEffect(() => {
        DiscountService.allDiscounts().then(data => {
            console.log(data.data);
            setDiscounts(data.data);
        });
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.getAttribute('data-id');
        if (id) {
            await DiscountService.deleteDiscount(id);
            window.location.href = '/';
        }
    }

    const handleEditButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.getAttribute('data-id');
        if (id) {
            const response = await DiscountService.getDiscount(id);
            setId(id);
            setName(response.data.uz.name);
            setDescription(response.data.uz.description);
            setRuName(response.data.ru.name);
            setRuDescription(response.data.ru.description);
            setPrice(response.data.price);
            openModal();
        }
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
        DiscountService.editDiscount(id, data).then(() => {
            window.location.href = '/'
        });
    }

    return (
        <div className={styles.tableContainer}>
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
                    {discounts.map((item, index) => (
                        <tr key={item.id}>
                            <td data-label="ID">{index + 1}</td>
                            <td data-label="Name">{item.uz.name}</td>
                            <td data-label="Name">{item.price}</td>
                            <td style={{ display: 'flex', gap: '5px', justifyContent: "flex-end" }} data-label="Name">
                                <button onClick={handleDelete} data-id={item.id} className='button secondary'>O'chirish</button>
                                <button onClick={handleEditButton} data-id={item.id} className='button primary'>Tahrirlash</button>
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
    );
}
