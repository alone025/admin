import { useEffect, useState } from 'react'
import styles from './costumers-table.module.scss'
import CostumerService from '../../services/CostumerService';

export default function CostumersTable() {
    const [costumers, setCostumers] = useState<any>([]);

    useEffect(() => {
        CostumerService.getCostumers().then(data => setCostumers(data.data))
    }, [])


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
                {costumers.map((item: any, index: number) => (
                    <tr key={item.id}>
                        <td data-label="ID">{index+1}</td>
                        <td data-label="Name">{item.firstName}</td>
                        <td data-label="Name">{item.lastName}</td>
                        <td data-label="Name">{item.telephone}</td>
                        <td data-label="Name">{item.cashback.barCode}</td>
                        <td data-label="Name">{item.cashback.balance}</td>
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