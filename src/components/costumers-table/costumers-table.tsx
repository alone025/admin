import { useEffect, useState } from 'react';
import styles from './costumers-table.module.scss';
import CostumerService from '../../services/CostumerService';

interface Cashback {
    barCode: string;
    balance: number;
}

interface Costumer {
    id: string;
    firstName: string;
    lastName: string;
    telephone: string;
    cashback: Cashback;
}


export default function CostumersTable() {
    const [costumers, setCostumers] = useState<Costumer[]>([]);

    useEffect(() => {
        CostumerService.getCostumers().then(data => setCostumers(data.data));
    }, []);

    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        CostumerService.search(event.target.value).then(data => setCostumers(data.data));
    }

    return (
        <div className={styles.tableContainer}>
            <div className={styles.table__filter}>
                <input className={styles.search} onChange={handleSearchChange} type="text" placeholder='Xaridorni izlang ...' />
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
                    {costumers.map((item, index) => (
                        <tr key={item.id}>
                            <td data-label="ID">{index + 1}</td>
                            <td data-label="Name">{item.firstName}</td>
                            <td data-label="Name">{item.lastName}</td>
                            <td data-label="Name">{item.telephone}</td>
                            <td data-label="Name">{item.cashback.barCode}</td>
                            <td data-label="Name">{item.cashback.balance}</td>
                            <td style={{ display: 'flex', gap: '5px', justifyContent: "flex-end" }} data-label="Name">
                                <button className='button secondary'>Ayirish</button>
                                <button className='button primary'>Qo'shish</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
