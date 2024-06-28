import styles from './categories-form.module.scss'

interface CategoriesFormProps {
    setCategoryName: (name: string) => void;
    setCategoryRuName: (name: string) => void;
    errors: {
        categoryName?: string;
        categoryRuName?: string;
    };
}

export default function CategoriesForm({ setCategoryName, setCategoryRuName, errors }: CategoriesFormProps ) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h1>O'zbekcha:</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setCategoryName(e.target.value)}
                            type="text"
                            placeholder="Kategoriya nomini yozing"
                        />
                        {errors.categoryName && <span className="error">{errors.categoryName}</span>}
                    </div>
                </div>

                <div className={styles.section}>
                    <h1>Ruscha</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setCategoryRuName(e.target.value)}
                            type="text"
                            placeholder="Kategoriya nomini yozing"
                        />
                        {errors.categoryRuName && <span className="error">{errors.categoryRuName}</span>}
                    </div>
                </div>
            </div>
        </>
    );
}