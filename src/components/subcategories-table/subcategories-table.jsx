import styles from './subcategories-table.module.scss'

export default function SubCategoriesTable() {
    const data = [
        { id: 1, name: 'Telefonlar', category: 'Elektron jihozlar' },
        { id: 2, name: 'Erkaklar kiyimi', category: 'Kiyimlar' },
        { id: 3, name: 'Idishlar', category: 'Oshxona jihozlari' },
    ];

    return <div className={styles.tableContainer}>
        <div className={styles.table__filter}>
            <input className={styles.search} type="text" placeholder='Sub kategoriya nomini yozing... ' />
            <select class={styles.select}>
                <option selected disabled>Kategoriya tanlang</option>
                <option value="1">Oshxona jihozlar</option>
                <option value="2">Elektron jihozlar</option>
                <option value="3">Kiyimlar</option>
            </select>
        </div>
        <table className={styles.responsiveTable}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Sub-Kategoriya nomi</th>
                    <th>Kategoriyasi</th>
                    <th>Harakatlar</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td data-label="ID">{item.id}</td>
                        <td data-label="Name">{item.name}</td>
                        <td data-label="Name">{item.category}</td>
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