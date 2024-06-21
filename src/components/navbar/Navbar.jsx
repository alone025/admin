import styles from './navbar.module.scss';
import { Link } from "react-router-dom";


export default function Navbar ({ toggleSidebar, isVisible }) {

    return <nav className={`${styles.nav} ${isVisible ? styles.visible : ''}`}>
        <button onClick={toggleSidebar} className={styles.button}>
            <img className={styles.image} src="/burger-menu.svg" alt="buger icon" />
        </button>

        <div className={styles.admin__btn}>
            <Link className={styles.admin__link}>ADMIN</Link>
            <button className="button secondary">Chiqish</button>
        </div>
    </nav>
}