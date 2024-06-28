import styles from './adminadd-form.module.scss';



interface Error  {
    adminName: string
    adminPassword: string
    adminRole: string
}

interface SubCategoriesFormProps {
    setAdminName: (name: string) => void;
    setAdminParol: (password: string) => void;
    setAdminRole: (role: string) => void;
    errors: Error | undefined;
}

export default function AdminAddForm({
    setAdminName,
    setAdminParol,
    setAdminRole,
    errors
}: SubCategoriesFormProps) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h1>Admin name:</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setAdminName(e.target.value)}
                            type="text"
                            placeholder="Admin nomini yozing"
                        />
                        {errors?.adminName && <span className="error">{errors.adminName}</span>}
                    </div>
                </div>

                <div className={styles.section}>
                    <h1>Admin password</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setAdminParol(e.target.value)}
                            type="text"
                            placeholder="Admin parolni yozing"
                        />
                        {errors?.adminPassword && <span className="error">{errors.adminPassword}</span>}
                    </div>
                </div>

                <div className={styles.section}>
                <h1>Admin role</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setAdminRole(e.target.value)}
                            type="text"
                            placeholder="Admin rolini yozing"
                        />
                        {errors?.adminRole && <span className="error">{errors.adminRole}</span>}
                    </div>
                </div>
            </div>
        </>
    );
}
