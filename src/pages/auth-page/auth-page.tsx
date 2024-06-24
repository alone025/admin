import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './auth-page.module.scss'
import { Context } from '../../main';

const AuthPage = observer(() => {
    const [admin, setAdmin] = useState('');
    const [password, setPassword] = useState('');
    const { store } = useContext(Context);

    return (
        <form className={styles.auth}>
            <h1>ADMIN AKKAUNTIGA KIRING:</h1>
            <input
                onChange={(e) => setAdmin(e.target.value)}
                className={styles.input}
                type="text"
                placeholder="ADMIN NAME"
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                type="password"
                placeholder="ADMIN PASSWORD"
            />
            <button
                onClick={(e) => { e.preventDefault(); store.login(admin, password) }}
                className="button primary">
                Kirish
            </button>
        </form>
    );
});

export default AuthPage;
