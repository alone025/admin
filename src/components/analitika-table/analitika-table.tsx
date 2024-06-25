import { useEffect, useState } from "react";
import styles from "./analitika-table.module.scss";
import AnalizServise from "../../services/AnalitikaServise";


export default function AnaltikaTable() {
  const [analiz, setAnaliz] = useState<any>([]);

  useEffect(() => {
    AnalizServise.getOrders().then((data) => {
      console.log(data.data);
      setAnaliz(data.data);
    });
  }, []);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.table__filter}>
        <input
          className={styles.search}
          type="text"
          placeholder="Mahsulotni izlang ..."
        />
      </div>
      <table className={styles.responsiveTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Mahsulot nomi</th>
            <th>Mahsulot reytingi</th>
          </tr>
        </thead>
        <tbody>
          {analiz.map((item: any, index: number) => (
            <tr key={item._id}>
              <td data-label="ID">{index + 1}</td>
              <td data-label="Name">{item.author.firstName}</td>
              <td data-label="Name">{item.author.lastName}</td>
              <td data-label="Name">{item.author.telephone}</td>
              <td data-label="Name">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
