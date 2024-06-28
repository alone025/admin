import styles from "./costumers-page.module.scss";
import CostumersTable from "../../components/costumers-table/costumers-table";
import { API_URL } from "../../http";

export default function CostumersPage() {



  return (
    <section className={styles.costumers}>
      <div className={styles.costumers__head}>
        <h1>Xaridorlar: </h1>
        <button className="button primary" >
          <a href={`${API_URL}/analiytics/exel/users`} target='blank' style={{textDecoration: "none", color:"#fff"}}>Excel yuklab olish</a>
        </button>
      </div>

      <CostumersTable />
    </section>
  );
}
