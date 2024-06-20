import styles from './categories-table.module.scss'

export default function CategoriesTable() {
    const data = [
        { id: 1, name: 'Oshxona jihozlari' },
        { id: 2, name: 'Elektron jihozlar' },
        { id: 3, name: 'Kiyimlar' },
    ];

    return <div className={styles.tableContainer}>
        <input className={styles.search} type="text" placeholder='Kategoriya nomini yozing... ' />
        <table className={styles.responsiveTable}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Kategoriya nomi</th>
                    <th>Harakatlar</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td data-label="ID">{item.id}</td>
                        <td data-label="Name">{item.name}</td>
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