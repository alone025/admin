import styles from './admin-edit.module.scss';

interface CategoryEditFormProps {
    setAdminName: (name: string) => void;
    setAdminPassword: (name: string) => void;
    setAdminRole: (name: string) => void;
    adminName: string;
    password: string;
    role: string
}

const AdminEdit = ({ setAdminName, setAdminPassword, setAdminRole, adminName, password , role}: CategoryEditFormProps) => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h1>Admin name</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setAdminName(e.target.value)}
                            type="text"
                            value={adminName}
                            placeholder="Yangi loginni yozing"
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h1>Admin password</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setAdminPassword(e.target.value)}
                            type="text"
                            value={password}
                            placeholder="Yangi parolni yozing"
                        />
                    </div>
                </div>
                <div className={styles.section}>
                    <h1>Admin Role</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setAdminRole(e.target.value)}
                            type="text"
                            value={role}
                            placeholder="Yangi rolni yozing"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminEdit;
