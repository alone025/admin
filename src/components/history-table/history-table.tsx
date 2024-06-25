import { useEffect, useState } from "react";
import styles from "./history-table.module.scss";
import HistoryServise from "../../services/HistoryServise";

export default function HistoryTable() {
  const [history, setHistory] = useState<any>([]);

  useEffect(() => {
    HistoryServise.getOrders().then((data) => {
      console.log(data.data);
      setHistory(data.data);
    });
  }, []);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.table__filter}>
        <input
          className={styles.search}
          type="text"
          placeholder="Tarixni izlang ..."
        />
      </div>
      <table className={styles.responsiveTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cashback</th>
            <th>Summa</th>
            <th>Admin name</th>
            <th>Type</th>
          </tr>
        </thead>
        {
          history ? (
            <tbody></tbody>
          ):(<tbody>
            {history?.map((item: any, index: number) => (
              <tr key={item._id}>
                <td data-label="ID">{index + 1}</td>
                <td data-label="Name">{item.author.cashback}</td>
                <td data-label="Name">{item.author.summa}</td>
                <td data-label="Name">{item.admin_name}</td>
                <td data-label="Name">{item.type}</td>
              </tr>
            ))}
          </tbody>)
        }
      </table>
    </div>
  );
}
