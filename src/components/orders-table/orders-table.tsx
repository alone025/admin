import { useEffect, useState } from 'react'
import styles from './order-table.module.scss'
import OrderService from '../../services/OrderService';
import ViewModal from '../UI/view-modal/ViewModal';
import Order from './components/order/Order';

export default function OrdersTable() {
    const [orders, setOrders] = useState<any>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [order, setOrder] = useState<any>([])

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const viewHandle = async (e: any) => {
        const id = e.target.getAttribute('data-id');
        const data = await OrderService.getOrder(id);
        setOrder(data.data);
        openModal()
    }

    useEffect(() => {
        OrderService.getOrders().then(data => {
            console.log(data.data)
            setOrders(data.data);
        });
    }, [])

    return <div className={styles.tableContainer}>
        <div className={styles.table__filter}>
            <input className={styles.search} type="text" placeholder='Buyurtma izlang ...' />
        </div>
        <table className={styles.responsiveTable}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Buyurtmachi ismi</th>
                    <th>Buyurtmachi Familiya</th>
                    <th>Buyurtmachi telefon raqami</th>
                    <th>Buyurtma narxi</th>
                    <th>Harakatlar</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((item:any, index: number) => (
                    <tr key={item._id}>
                        <td data-label="ID">{index+1}</td>
                        <td data-label="Name">{item.author.firstName}</td>
                        <td data-label="Name">{item.author.lastName}</td>
                        <td data-label="Name">{item.author.telephone}</td>
                        <td data-label="Name">{item.price}</td>
                        <td style={{ display: 'flex', gap: '5px' }} data-label="Name">
                            <button onClick={viewHandle} data-id={item._id} className='button primary'>Batafsil</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <ViewModal isOpen={isModalOpen} onClose={closeModal} title='Buyurtma haqida'>
            <Order order={order} />   
        </ViewModal>
    </div>
}