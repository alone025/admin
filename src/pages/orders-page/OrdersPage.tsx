import styles from './orders-page.module.scss';
import OrdersTable from '../../components/orders-table/orders-table';

export default function OrdersPage () {
    return <section className={styles.orders}>
        <div className={styles.orders__head}>
            <h1>Buyurtmalar: </h1>
        </div>

        <OrdersTable />

    </section>
}