import ProductService from "../../services/ProductService";
import { useEffect, useState } from "react";
import styles from "./subcategories-table.module.scss";
import EditModal from "../UI/edit-modal/EditModal";
import SubCategoryEditForm from "./components/subcategories-edit";

export default function SubCategoriesTable({ data, setSubCategories }: any) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [subCategoryName, setSubCategoryName] = useState<string>("");
  const [subCategoryRuName, setSubCategoryRuName] = useState<string>("");
  const [subCategory, setSubCategory] = useState<any>();
  const [category, setCategory] = useState<any>();
  const [categories, setCategories] = useState<any>([]);
  const [filterCategory, setFilterCategory] = useState<any>();
  const [filteredCategory, setFilteredCategory] = useState<any>();
  const [searchqueary, setsearchquery] = useState<any>();
  const [filterData, setFilterData] = useState<any>(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Categories = await ProductService.getCategories();
        setFilterCategory(Categories.data);
      } catch (error) {
        console.log("Xato");
      }
    };

    fetchData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const deleteSubCategory = (event: any) => {
    const id = event.target.getAttribute("data-id");
    ProductService.deleteSubCategory(id).then(() => {
      window.location.href = "/";
    });
  };

  const handleEditButton = async (event: any) => {
    const id = event.target.getAttribute("data-id");
    const response = await ProductService.getSubCategory(id);
    const categories = await ProductService.getCategories();

    const data = response.data;
    console.log(data.subCategory);
    setSubCategory(data.subCategory);
    setCategories(categories.data);
    setSubCategoryName(data.subCategory.uz.name);
    setSubCategoryRuName(data.subCategory.ru.name);
    openModal();
  };

  const handleEdit = () => {
    ProductService.updateSubCategory(subCategory._id, {
      uz: { name: subCategoryName },
      ru: { name: subCategoryRuName },
      category: category,
    }).then(async () => {
      const subCategories = await ProductService.getSubCategories();
      setSubCategories(subCategories.data);
      closeModal();
    });
  };

  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilteredCategory(event.target.value);
    const newData = data.filter(
      (product) => product.category.uz.name === event.target.value
    );

    if (searchqueary) {
      const newDataSearch = newData.filter((product) =>
        product.uz.name.toLowerCase().includes(searchqueary.toLowerCase())
      );
      setFilterData(newDataSearch);
   
    } else {
      setFilterData(newData);
     
    }

  }
  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setsearchquery(event.target.value);
    const newsearchdata = data.filter((product) =>
      product.uz.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    if (filteredCategory) {
      const newDataSearch = newsearchdata.filter(
        (product) => product.category.uz.name === filteredCategory
      );
      setFilterData(newDataSearch);
    
    } else {
      setFilterData(newsearchdata);
      
    }
  }

  

  return (
    <div className={styles.tableContainer}>
      <div className={styles.table__filter}>
        <input
          className={styles.search}
          type="text"
          placeholder="Sub kategoriya nomini yozing... "
          onChange={handleSearchChange}
        />
        <select className={styles.select} onChange={handleCategoryChange}>
          <option selected disabled>
            Kategoriya tanlang
          </option>
          {filterCategory?.map((e: any, ec: any) => (
            <option value={e.uz.name} key={ec}>
              {e.uz.name}
            </option>
          ))}
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
          {filterData.map((item: any, index: number) => (
            <tr key={item._id}>
              <td data-label="ID">{index + 1}</td>
              <td data-label="Name">{item.uz.name}</td>
              <td data-label="Name">{item.category.uz.name}</td>
              <td
                style={{
                  display: "flex",
                  gap: "5px",
                  justifyContent: "flex-end",
                }}
                data-label="Name"
              >
                <button
                  className="button secondary"
                  onClick={deleteSubCategory}
                  data-id={item._id}
                >
                  O'chirish
                </button>
                <button
                  className="button primary"
                  data-id={item._id}
                  onClick={handleEditButton}
                >
                  Tahrirlash
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditModal
        sendData={handleEdit}
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Sub Kategoriya tahrirlang"
      >
        <SubCategoryEditForm
          setSubCategoryName={setSubCategoryName}
          setSubCategoryRuName={setSubCategoryRuName}
          setCategory={setCategory}
          subCategoryName={subCategoryName}
          subCategoryRuName={subCategoryRuName}
          categories={categories}
        />
      </EditModal>
    </div>
  );
}
