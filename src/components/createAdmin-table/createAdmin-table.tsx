import { useEffect, useState } from 'react';
import EditModal from '../UI/edit-modal/EditModal';
import AdminEdit from './components/adminEdit-form';
import styles from './createAdmin-table.module.scss';
import CreateAdminService from '../../services/createAdminService';

type DataAdmin = {
    _id: string,
    adminName: string,
    role: string,
    password:string,
    login: string,
}

export default function CreateAdminTable({ data }: {data : DataAdmin[]} ) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [AdminName, setAdminName] = useState<string>('');
    const [Password, setPassword] = useState<string>('');
    const [adminRole, setAdminRole] = useState<string>('');
    const [adminData, setAdminData] = useState<DataAdmin>();
    const [filterData, setFilterData] = useState(data);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        setFilterData(data);
    }, [data]);

    const deleteCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.getAttribute('data-id')!;
        CreateAdminService.deleteAdmin(id).then(() => window.location.href = '/');
    };

    const handleEditButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.getAttribute('data-id')!;
        const response = data.filter((admin)=> admin._id == id)
        console.log(response[0]);
        
        setAdminData(response[0]);
        setAdminName(response[0].adminName)
        setPassword(response[0].password)
        setAdminRole(response[0].role)
        openModal();
    };

    const handleEdit = () => {
        if (adminData) {
            CreateAdminService.updateCategory(adminData._id, { adminName: AdminName, password: Password, role: adminRole })
                .then((data) => {
                    console.log(data);
                    closeModal();
                    window.location.href = '/';
                });
        }
    };

    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newSearchData = data.filter((admin) =>
            admin.adminName.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilterData(newSearchData);
    }

    return (
        <div className={styles.tableContainer}>
            <input className={styles.search} type="text" placeholder='Admin nomini yozing...' onChange={handleSearchChange} />
            <table className={styles.responsiveTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Admin nomi</th>
                        <th>Admin roli</th>
                        <th>Admin paroli</th>
                        <th>Harakatlar</th>
                    </tr>
                </thead>
                <tbody>
                    {filterData.map((item, index) => (
                        <tr key={index + 1}>
                            <td data-label="ID">{index + 1}</td>
                            <td data-label="Name">{item.adminName}</td>
                            <td data-label="Name">{item.role}</td>
                            <td data-label="Name">{item.password}</td>
                            <td style={{ display: 'flex', gap: '5px', justifyContent: "flex-end" }} data-label="Name">
                                <button data-id={item._id} className='button secondary' onClick={deleteCategory}>O'chirish</button>
                                <button data-id={item._id} className='button primary' onClick={handleEditButton}>Tahrirlash</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <EditModal sendData={handleEdit} isOpen={isModalOpen} onClose={closeModal} title='Kategoriyani tahrirlang'>
                <AdminEdit adminName={AdminName} password={Password} setAdminName={setAdminName} setAdminPassword={setPassword} role={adminRole} setAdminRole={setAdminRole} />
            </EditModal>
        </div>
    );
}
