import { useContext } from "react";
import styles from "./navbar.module.scss";
import { Link } from "react-router-dom";
import { Context } from "../../main";

const Navbar = ({
  toggleSidebar,
  isVisible,
}: {
  toggleSidebar: any;
  isVisible: boolean;
}) => {
  const { store } = useContext(Context);
  return (
    <div id={!isVisible ? "nav-active":"nav"} >
      <nav className={`${styles.nav} ${isVisible ? styles.visible : ""}`}>
        <button onClick={toggleSidebar} className={styles.button}>
          <img
            className={styles.image}
            src="/burger-icon.svg"  
            alt="buger icon"
          />
        </button>

        <div className={styles.admin__btn}>
          <Link to={"/"} className={styles.admin__link}>
            ADMIN
          </Link>
          <button onClick={(e) => store.logout()} className="button secondary">
            Chiqish
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
