import ProductService from "../../services/ProductService";
import { useEffect, useState } from "react";
import styles from "./subcategories-table.module.scss";
import EditModal from "../UI/edit-modal/EditModal";
import SubCategoryEditForm from "./components/subcategories-edit";

interface SubCategory {
  _id: string;
  uz: { name: string };
  ru: { name: string };
  category: { _id: string; uz: { name: string } };
  categoryId: string | null
}


interface Category {
  _id: string;
  uz: { name: string };
}

interface SubCategoriesTableProps {
  data: SubCategory[];
  setSubCategories: (subCategories: SubCategory[]) => void;
}

export default function SubCategoriesTable({ data, setSubCategories }: SubCategoriesTableProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [subCategoryName, setSubCategoryName] = useState<string>("");
  const [subCategoryRuName, setSubCategoryRuName] = useState<string>("");
  const [subCategory, setSubCategory] = useState<SubCategory | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filterCategory, setFilterCategory] = useState<Category[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterData, setFilterData] = useState<SubCategory[]>(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await ProductService.getCategories();
        setFilterCategory(categoriesResponse);
      } catch (error) {
        console.log("Xato");
      }
    };

    fetchData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const deleteSubCategory = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.getAttribute("data-id");
    if (id) {
      await ProductService.deleteSubCategory(id);
      window.location.href = "/";
    }
  };

  const handleEditButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.getAttribute("data-id");
    if (id) {
      const response = await ProductService.getSubCategory(id);
      const categoriesResponse = await ProductService.getCategories();

      setSubCategory(response);
      setCategories(categoriesResponse);
      setSubCategoryName(response.uz.name);
      setSubCategoryRuName(response.ru.name);
      openModal();
    }
  };

  const handleEdit = async () => {
    if (subCategory) {
      await ProductService.updateSubCategory(subCategory._id, {
        uz: { name: subCategoryName },
        ru: { name: subCategoryRuName },
        categoryId: category,
      });
      const subCategoriesResponse = await ProductService.getSubCategories();
      setSubCategories(subCategoriesResponse);
      closeModal();
    }
  };

  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedCategory = event.target.value;
    setFilteredCategory(selectedCategory);

    const newData = data.filter(
      (product) => product.category.uz.name === selectedCategory
    );

    if (searchQuery) {
      const newDataSearch = newData.filter((product) =>
        product.uz.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilterData(newDataSearch);
    } else {
      setFilterData(newData);
    }
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setSearchQuery(query);

    const newSearchData = data.filter((product) =>
      product.uz.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredCategory) {
      const newDataSearch = newSearchData.filter(
        (product) => product.category.uz.name === filteredCategory
      );
      setFilterData(newDataSearch);
    } else {
      setFilterData(newSearchData);
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
          {filterCategory.map((e) => (
            <option value={e.uz.name} key={e._id}>
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
          {filterData.map((item, index) => (
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
