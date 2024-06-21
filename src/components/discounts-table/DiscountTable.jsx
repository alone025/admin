import styles from './discount-table.module.scss'

export default function DiscountsTable() {
    const data = [
        { id: 1, name: 'Qaynoq chegirmalar', price: '200$'},
        { id: 2, name: 'Sovuq chegirmalar', price: '40$'},
        { id: 3, name: 'Yangi chegirmalar', price: '10$'},
    ];

    return <div className={styles.tableContainer}>
        <div className={styles.table__filter}>
            <input className={styles.search} type="text" placeholder='Chegirma nomini yozing ...' />
        </div>
        <table className={styles.responsiveTable}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Chegirma nomi</th>
                    <th>Chegirma narxi</th>
                    <th>Harakatlar</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td data-label="ID">{item.id}</td>
                        <td data-label="Name">{item.name}</td>
                        <td data-label="Name">{item.price}</td>
                        <td style={{ display: 'flex', gap: '5px' }} data-label="Name">
                            <button className='button secondary' >O'chirish</button>
                            <button className='button primary'>Tahrirlash</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}