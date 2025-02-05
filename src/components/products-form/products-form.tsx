import styles from './products-form.module.scss'

interface Category {
    _id: string;
    uz: {
        name: string;
    };
    // Add more properties as needed
}

interface SubCategory {
    _id: string;
    uz: {
        name: string;
    };
    category: {
        _id: string;
    };
}

interface ErrorType {
    name?: string;
    description?: string;
    ruName?: string;
    ruDescription?: string;
    price?: string;
    category?: string;
    subCategory?: string;
    file?: string;
}


interface ProductsFormProps {
    setName: (value: string) => void;
    setDescription: (value: string) => void;
    setRuName: (value: string) => void;
    setRuDescription: (value: string) => void;
    setPrice: (value: string) => void;
    setCategory: (value: string) => void;
    setSubCategory: (value: string) => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    categories: Category[];
    subCategories: SubCategory[];
    errors: ErrorType;
    category: string
}


export default function ProductsForm({
    setName,
    setDescription,
    setRuName,
    setRuDescription,
    setPrice,
    category,
    setCategory,
    setSubCategory,
    handleFileChange,
    categories,
    subCategories,
    errors
}: ProductsFormProps) {

    const filteredSubCategories = category
        ? subCategories.filter((subCategory: SubCategory) => subCategory.category._id === category)
        : subCategories;


    console.log(subCategories);
    

    return (
        <>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h1>O'zbekcha:</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Mahsulot nomini yozing"
                        />
                        {errors.name && <span className="error">{errors.name}</span>}

                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Mahsulot haqidani yozing"
                        />
                        {errors.description && <span className="error">{errors.description}</span>}
                    </div>
                </div>

                <div className={styles.section}>
                    <h1>Ruscha</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setRuName(e.target.value)}
                            type="text"
                            placeholder="Mahsulot nomini yozing"
                        />
                        {errors.ruName && <span className="error">{errors.ruName}</span>}
                        <textarea
                            onChange={(e) => setRuDescription(e.target.value)}
                            placeholder="Mahsulot haqidani yozing"
                        />
                        {errors.ruDescription && <span className="error">{errors.ruDescription}</span>}
                    </div>
                </div>

                <div className={styles.section}>
                    <h1>Umumiy</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            type="text"
                            placeholder="Mahsulot narxini yozing"
                        />
                        {errors.price && <span className="error">{errors.price}</span>}
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            id="product-categories"
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
                        {errors.category && <span className="error">{errors.category}</span>}
                        <select
                            onChange={(e) => setSubCategory(e.target.value)}
                            id="product-subcategories"
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
                        {errors.subCategory && <span className="error">{errors.subCategory}</span>}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {errors.file && <span className="error">{errors.file}</span>}
                    </div>
                </div>
            </div>
        </>
    );
}

