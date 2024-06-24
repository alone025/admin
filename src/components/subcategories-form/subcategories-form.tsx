import styles from './subcategories-form.module.scss'

export default function SubCategoriesForm({ setSubCategoryName, setSubCategoryRuName, categories, setCategory, errors }: { setSubCategoryName: any, setSubCategoryRuName: any, categories: any, setCategory: any, errors: any }) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h1>O'zbekcha:</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setSubCategoryName(e.target.value)}
                            type="text"
                            placeholder="Kategoriya nomini yozing"
                        />
                        {errors.subCategoryName && <span className="error">{errors.subCategoryName}</span>}

                    </div>

                </div>

                <div className={styles.section}>
                    <h1>Ruscha</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setSubCategoryRuName(e.target.value)}
                            type="text"
                            placeholder="Sub Kategoriya nomini yozing"
                        />
                        {errors.subCategoryRuName && <span className="error">{errors.subCategoryRuName}</span>}
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
                        {errors.category && <span className="error">{errors.category}</span>}

                    </div>
                </div>
            </div>
        </>
    );
}