import styles from './discount-form.module.scss'


interface Errors {
    name?: string;
    description?: string;
    ruName?: string;
    ruDescription?: string;
    price?: string;
    file?: string;
}

interface DiscountFormProps {
    setName: (name: string) => void;
    setRuName: (name: string) => void;
    setDescription: (description: string) => void;
    setRuDescription: (description: string) => void;
    setPrice: (price: string) => void;
    errors: Errors;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function DiscountForm({
    setName,
    setRuName,
    setDescription,
    setRuDescription,
    setPrice,
    errors,
    handleFileChange
}: DiscountFormProps) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h1>O'zbekcha:</h1>
                    <div className={styles.inputGroup}>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Chegirma nomini yozing"
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Chegirma haqida yozing"
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
                            placeholder="Chegirma ruscha nomini yozing"
                        />
                        {errors.ruName && <span className="error">{errors.ruName}</span>}
                        <textarea
                            onChange={(e) => setRuDescription(e.target.value)}
                            placeholder="Chegirma haqida ruscha yozing"
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