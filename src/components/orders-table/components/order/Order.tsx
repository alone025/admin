import styles from './order.module.scss';

const Order = ({ order }: any) => {
    return (
        <div className={styles.orderContainer}>
            <h1 className={styles.orderTitle}>Buyurtma haqida: </h1>

            <span className={styles.productsLabel}>Mahsulotlar</span>
            <ul className={styles.productsList}>
                {order.products.map((item: any, index: number) => (
                    <li>{index+1}. {item.uz.name}</li>
                ))}
            </ul>

            <h2 className={styles.productPrice}>
                Product price: <span className={styles.priceAmount}>{order.price}</span>
            </h2>
        </div>
    );
};

export default Order;
