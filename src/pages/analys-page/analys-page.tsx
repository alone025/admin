import styles from './analys-page.module.scss';
import AnaltikaTable from '../../components/analitika-table/analitika-table';
import { API_URL } from '../../http';

export default function AnalysPage () {

    return <section className={styles.analys}>
        <div className={styles.analys_head}>
            <h1>Stastika: </h1>
            <button className='button primary' >
                <a href={`${API_URL}/analiytics/excel/top-costumers`} target='blank' style={{textDecoration: "none", color:"#fff"}}>Excel yuklab olish</a>
            </button>
        </div>

        <AnaltikaTable />

    </section>
}