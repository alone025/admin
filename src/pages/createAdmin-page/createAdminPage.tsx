import  { useEffect, useState } from "react";

import styles from "./createAdminPage.module.scss";
import CreateAdminTable from "../../components/createAdmin-table/createAdmin-table";
import CreateAdminService from "../../services/createAdminService";
import Modal from "../../components/UI/modal/Modal";
import AdminAddForm from "../../components/adminAddForm/adminadd-form";

type Error = {
    adminName: string
    adminPassword: string
    adminRole: string
}


const CreateAdminPage = () => {
  const [data, setData]  = useState([  ])
  const [admin_name, setAdmin_name] = useState<string>("")
  const [admin_parol, setAdmin_parol] = useState<string>("")
  const [admin_role, setAdmin_role] = useState<string>("")
  const [errors, setErrors]=useState<Error>()
  const [modal, setModal] = useState<boolean>()

  useEffect(()=>{
    const getadmin = async () => {
        CreateAdminService.getAdmins().then(data =>{ console.log(data.data) , setData(data.data)}
        );
    }
    getadmin()
  },[])


  const sendData = () => {
    const ultimateErrors = {
        adminName: admin_name.trim() ? "" : "Iltimos nomini yozing",
        adminPassword: admin_parol.trim()
          ? ""
          : "Iltimos parolni yozing",
        adminRole: admin_role.trim() ? "" : "Rolni yozing",
      };
      setErrors(ultimateErrors);

      CreateAdminService.createAdmin(
        admin_name,
        admin_parol,
        admin_role
      ).then((data) => {
        console.log(data);
        setModal(false);
        window.location.href = "/";
      });
  }

  const onclose = () => setModal(false)

  return (
    <section className={styles.createAdmin}>
      <div className={styles.createAdmin__head}>
        <h1>Adminlar: </h1>
        <button className='button primary' onClick={()=> setModal(true)}>Qo'shish</button>
      </div>

      <CreateAdminTable data={data} />

      <Modal
        sendData={sendData}
        isOpen={modal}
        onClose={onclose}
        title="Admin qo'shish"
      >
        <AdminAddForm
          errors={errors}
          setAdminName={setAdmin_name}
          setAdminParol={setAdmin_parol}
          setAdminRole={setAdmin_role}
        />
      </Modal>
    </section>
  );
};

export default CreateAdminPage;
