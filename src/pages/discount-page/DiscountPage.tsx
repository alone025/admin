import styles from './discount-page.module.scss';
import DiscountsTable from '../../components/discount-table/DiscountTable';
import { ChangeEvent, FC, useState } from "react";
import Modal from '../../components/UI/modal/Modal';
import DiscountForm from '../../components/discount-form/discount-form';
import DiscountService from '../../services/DiscountService';


const DiscountPage: FC = () => {
    const [name, setName] = useState<any>();
    const [description, setDescription] = useState<any>();
    const [ruName, setRuName] = useState<any>();
    const [ruDescription, setRuDescription] = useState<any>();
    const [price, setPrice] = useState<any>();
    const [selectedFile, setSelectedFile] = useState<any>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        ruName: '',
        ruDescription: '',
        price: '',
        file: '',
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false)
    };

    const handleAddButton = () => {
        openModal();
        const newErrors = {
            name: '',
            description: '',
            ruName: '',
            ruDescription: '',
            price: '',
            file: '',
        };
        setErrors(newErrors);
    }

    const handleAdd = async () => {
        const newErrors = {
            name: name?.trim() ? '' : 'Iltimos nomini yozing',
            description: description?.trim() ? '' : 'iltimos haqidani yozing',
            ruName: ruName?.trim() ? '' : 'Iltimos rus tili nomini yozing',
            ruDescription: ruDescription?.trim() ? '' : 'Iltimos haqidani ruschasini yozing',
            price: price?.trim() ? '' : 'Iltimos narxini yozing',
            file: selectedFile ? '' : 'Iltimos maxsulot rasmini tanlang',
        };
        setErrors(newErrors);

        await DiscountService.createDiscount(name, description, ruName, ruDescription, price, selectedFile);

        window.location.href = '/'
        closeModal();
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
        }
    };

    return <section className={styles.dicsounts}>
        <div className={styles.dicsounts_head}>
            <h1>Chegirmalar: </h1>
            <button onClick={handleAddButton} className='button primary'>Qo'shish</button>
        </div>

        <DiscountsTable
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
            selectedFile={selectedFile}
        />
        <Modal onClose={closeModal} isOpen={isModalOpen} sendData={handleAdd} title='Chegirma qoshing'>
            <DiscountForm
                setName={setName}
                setRuName={setRuName}
                setDescription={setDescription}
                setRuDescription={setRuDescription}
                setPrice={setPrice}
                errors={errors}
                handleFileChange={handleFileChange}
            />
        </Modal>
    </section>
}

export default DiscountPage;