import styles from './discounts-page.module.scss';
import DiscountTable from '../../components/discounts-table/DiscountTable'

export default function DiscountsTable () {
    return <section className={styles.dicsounts}>
        <div className={styles.dicsounts_head}>
            <h1>Chegirmalar: </h1>
            <button className='button primary'>Qo'shish</button>
        </div>

        <DiscountTable/>
    </section>
}