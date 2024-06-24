import styles from './costumers-page.module.scss';
import CostumersTable from '../../components/costumers-table/costumers-table';


export default function CostumersPage() {
    return <section className={styles.costumers}>
        <div className={styles.costumers__head}>
            <h1>Xaridorlar: </h1>
        </div>

        <CostumersTable />

    </section>
}