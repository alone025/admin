import styles from './subcategories-edit.module.scss';

const SubCategoryEditForm = ({ setSubCategoryName, setSubCategoryRuName, setCategory,  subCategoryName, subCategoryRuName, categories }: any) => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h1>O'zbekcha:</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setSubCategoryName(e.target.value)}
                            type="text"
                            value={subCategoryName}
                            placeholder="Kategoriya nomini yozing"
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h1>Ruscha</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setSubCategoryRuName(e.target.value)}
                            type="text"
                            value={subCategoryRuName}
                            placeholder="Kategoriya nomini yozing"
                        />
                    </div>
                </div>
                <div className={styles.section}>
                    <h1>Umumiy</h1>
                    <div className={styles.inputGroup}>
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            id="product-categories"
                        >
                            <option disabled selected value="dd">
                                Kategoriya tanlang
                            </option>
                            {categories.map((category: any) => (
                                <option key={category._id} value={category._id}>
                                    {category.uz.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SubCategoryEditForm;
