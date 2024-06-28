import styles from './edit-form.module.scss';

interface CategoryEditFormProps {
    setCategoryName: (name: string) => void;
    setCategoryRuName: (name: string) => void;
    categoryName: string;
    categoryRuName: string;
}

const CategoryEditForm = ({ setCategoryName, setCategoryRuName, categoryName, categoryRuName }: CategoryEditFormProps) => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h1>O'zbekcha:</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setCategoryName(e.target.value)}
                            type="text"
                            value={categoryName}
                            placeholder="Kategoriya nomini yozing"
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h1>Ruscha</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setCategoryRuName(e.target.value)}
                            type="text"
                            value={categoryRuName}
                            placeholder="Kategoriya nomini yozing"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryEditForm;
