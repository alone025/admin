import { useEffect, useState } from "react";
import styles from "./history-table.module.scss";
import HistoryService from "../../services/HistoryServise";

interface HistoryItem {
  _id: string;
  author: {
    cashback: string; 
    summa: string; 
  };
  admin_name: string;
  type: string;
}

export default function HistoryTable() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    HistoryService.getOrders().then((data) => {
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
        <tbody>
          {history.map((item, index) => (
            <tr key={item._id}>
              <td data-label="ID">{index + 1}</td>
              <td data-label="Cashback">{item.author.cashback}</td>
              <td data-label="Summa">{item.author.summa}</td>
              <td data-label="AdminName">{item.admin_name}</td>
              <td data-label="Type">{item.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
