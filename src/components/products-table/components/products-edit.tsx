
import styles from './products-edit.module.scss';

interface Category {
    _id: string;
    uz: {
        name: string;
    };
}

interface SubCategory {
    _id: string;
    category: {
        _id: string;
    };
    uz: {
        name: string;
    };
}

interface ProductsEditFormProps {
    setName: (name: string) => void;
    name: string;
    setDescription: (description: string) => void;
    description: string;
    setRuName: (ruName: string) => void;
    ruName: string;
    setRuDescription: (ruDescription: string) => void;
    ruDescription: string;
    setPrice: (price: string) => void;
    price: string;
    setCategory: (category: string) => void;
    category: string;
    setSubCategory: (subCategory: string) => void;
    subCategory: string;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedFile: string;
    subCategories: SubCategory[];
    categories: Category[];
}



const ProductsEditForm: React.FC<ProductsEditFormProps> = ({
    setName,
    name,
    setDescription,
    description,
    setRuName,
    ruName,
    setRuDescription,
    ruDescription,
    setPrice, 
    price,
    setCategory,
    category,
    setSubCategory,
    subCategory,
    handleFileChange,
    selectedFile,
    subCategories,
    categories
}) => {

    const filteredSubCategories = category
        ? subCategories.filter((subCategory) => subCategory.category._id === category)
        : subCategories;


    return (
        <>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h1>O'zbekcha:</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            value={name}
                            placeholder="Mahsulot nomini yozing"
                        />

                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Mahsulot haqidani yozing"
                            value={description}
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h1>Ruscha</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setRuName(e.target.value)}
                            type="text"
                            placeholder="Mahsulot nomini yozing"
                            value={ruName}
                        />
                        <textarea
                            onChange={(e) => setRuDescription(e.target.value)}
                            placeholder="Mahsulot haqidani yozing"
                            value={ruDescription}
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h1>Umumiy</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            type="text"
                            placeholder="Mahsulot narxini yozing"
                            value={price}
                        />
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            id="product-categories"
                            value={category}
                        >
                            <option disabled selected value="dd">
                                Kategoriya tanlang
                            </option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.uz.name}
                                </option>
                            ))}
                        </select>
                        <select
                            onChange={(e) => setSubCategory(e.target.value)}
                            id="product-subcategories"
                            value={subCategory}
                        >
                            <option disabled selected value="dd">
                                Subkategoriya tanlang
                            </option>
                            {filteredSubCategories.map((subCategory) => (
                                <option key={subCategory._id} value={subCategory._id}>
                                    {subCategory.uz.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            value={selectedFile}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductsEditForm;
