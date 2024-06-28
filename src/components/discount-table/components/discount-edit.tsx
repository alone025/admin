import styles from './discount-edit.module.scss'

interface DiscountFormProps {
    name: string
    setName: (name: string) => void;
    setRuName: (name: string) => void;
    ruName: string
    setDescription: (description: string) => void;
    description: string
    setRuDescription: (description: string) => void;
    ruDescription: string
    setPrice: (price: string) => void;
    price: number|string
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function DiscountEditForm({
    setName,
    name,
    setRuName,
    ruName,
    setDescription,
    description,
    setRuDescription,
    ruDescription,
    setPrice,
    price,
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
                            value={name}
                        />
                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Chegirma haqida yozing"
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
                            placeholder="Chegirma ruscha nomini yozing"
                            value={ruName}
                        />
                        <textarea
                            onChange={(e) => setRuDescription(e.target.value)}
                            placeholder="Chegirma haqida ruscha yozing"
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
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}