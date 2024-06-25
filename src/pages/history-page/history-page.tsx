import styles from "./history-page.module.scss";
import HistoryTable from "../../components/history-table/history-table";

export default function HistoryPage() {
  return (
    <section className={styles.history}>
      <div className={styles.history_head}>
        <h1>Tarix: </h1>
      </div>

      <HistoryTable />
    </section>
  );
}
