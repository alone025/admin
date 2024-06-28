import { useContext } from "react";
import styles from "./navbar.module.scss";
import { Link } from "react-router-dom";
import { Context } from "../../main";

interface NavbarProps {
  toggleSidebar: () => void; 
  isVisible: boolean;
}


const Navbar = ({
  toggleSidebar,
  isVisible,
}: NavbarProps) => {
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
          <button onClick={() => store.logout()} className="button secondary">
            Chiqish
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
