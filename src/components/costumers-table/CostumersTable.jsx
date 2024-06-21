import styles from './costumers-table.module.scss'

export default function CostumersTable() {
    const data = [
        { id: 1, firstName: 'Akbar', lastName: 'Olimjonov', telephone: '+998900466681', ball: 15, barCode: '1243355645433'},
        { id: 2, firstName: 'Akbar', lastName: 'Olimjonov', telephone: '+998900466681', ball: 15, barCode: '1243355645433'},
        { id: 3, firstName: 'Akbar', lastName: 'Olimjonov', telephone: '+998900466681', ball: 15, barCode: '1243355645433'},
    ];

    return <div className={styles.tableContainer}>
        <div className={styles.table__filter}>
            <input className={styles.search} type="text" placeholder='Xardifor izlang ...' />
        </div>
        <table className={styles.responsiveTable}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Ism</th>
                    <th>Familiya</th>
                    <th>Telefon raqam</th>
                    <th>Cashback</th>
                    <th>Cashback ball</th>
                    <th>Harakatlar</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td data-label="ID">{item.id}</td>
                        <td data-label="Name">{item.firstName}</td>
                        <td data-label="Name">{item.lastName}</td>
                        <td data-label="Name">{item.telephone}</td>
                        <td data-label="Name">{item.barCode}</td>
                        <td data-label="Name">{item.ball}</td>
                        <td style={{ display: 'flex', gap: '5px' }} data-label="Name">
                            <button className='button secondary' >Ayirish</button>
                            <button className='button primary'>Qo'shish</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}