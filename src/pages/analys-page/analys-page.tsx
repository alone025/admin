import styles from './analys-page.module.scss';
import AnaltikaTable from '../../components/analitika-table/analitika-table';

export default function AnalysPage () {
    return <section className={styles.analys}>
        <div className={styles.analys_head}>
            <h1>Stastika: </h1>
            <button className='button primary'>Excel yuklash</button>
        </div>

        <AnaltikaTable />

    </section>
}