import styles from './subcategories-edit.module.scss';

interface Category {
  _id: string;
  uz: { name: string };
}

interface SubCategoryEditFormProps {
  setSubCategoryName: (name: string) => void;
  setSubCategoryRuName: (name: string) => void;
  setCategory: (categoryId: string) => void;
  subCategoryName: string;
  subCategoryRuName: string;
  categories: Category[];
}

const SubCategoryEditForm = ({
  setSubCategoryName,
  setSubCategoryRuName,
  setCategory,
  subCategoryName,
  subCategoryRuName,
  categories
}: SubCategoryEditFormProps) => {
  return (
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
            defaultValue="dd"
          >
            <option disabled value="dd">
              Kategoriya tanlang
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.uz.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SubCategoryEditForm;
