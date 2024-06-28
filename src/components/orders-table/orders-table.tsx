import { useEffect, useState, MouseEvent } from 'react';
import styles from './order-table.module.scss';
import OrderService from '../../services/OrderService';
import ViewModal from '../UI/view-modal/ViewModal';
import Order from './components/order/Order';


interface Product {
    uz: {
      name: string;
    };
  }
  
interface OrderItem {
    products: Product[];
  _id: string;
  author: {
    firstName: string;
    lastName: string;
    telephone: string;
  };
  price: number | string; // Assuming price is of type number, adjust as per your data structure
  // Add more fields as per your actual data structure
}

export default function OrdersTable() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderItem | null>(null); // Initially null until an order is fetched

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const viewHandle = async (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.getAttribute('data-id'); // Using currentTarget to access the button element
    if (id) {
      const data = await OrderService.getOrder(id);
      setOrder(data.data);
      openModal();
    }
  };

  useEffect(() => {
    OrderService.getOrders().then(data => {
      console.log(data.data);
      setOrders(data.data);
    });
  }, []);

  return (
    <div className={styles.tableContainer}>
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
          {orders.map((item, index) => (
            <tr key={item._id}>
              <td data-label="ID">{index + 1}</td>
              <td data-label="Name">{item.author.firstName}</td>
              <td data-label="Name">{item.author.lastName}</td>
              <td data-label="Name">{item.author.telephone}</td>
              <td data-label="Name">{item.price}</td>
              <td style={{ display: 'flex', gap: '5px', justifyContent: "flex-end" }} data-label="Name">
                <button onClick={viewHandle} data-id={item._id} className='button primary'>Batafsil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ViewModal isOpen={isModalOpen} onClose={closeModal} title='Buyurtma haqida'>
        {order && <Order order={order} />}
      </ViewModal>
    </div>
  );
}
