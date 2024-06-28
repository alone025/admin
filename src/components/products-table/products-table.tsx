import ProductService from "../../services/ProductService";
import EditModal from "../UI/edit-modal/EditModal";
import ProductsEditForm from "./components/products-edit";
import styles from "./products-table.module.scss";
import { ChangeEvent, useEffect, useState } from "react";

interface Category {
  _id: string;
  uz: {
    name: string;
  };
}

interface SubCategory {
  _id: string;
  uz: {
    name: string;
  };
  category: {
    _id: string;
  };
}

interface Product {
  _id: string;
  uz: {
    name: string;
    description: string;
  };
  ru: {
    name: string;
    description: string;
  };
  price: string;
  category: Category;
  subCategory: SubCategory;
}

interface ProductsTableProps {
  data: Product[];
}

export default function ProductsTable({ data }: ProductsTableProps) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>();

  const [filterCategory, setFilterCategory] = useState<Category[]>([]);
  const [filterSubCategory, setFilterSubCategory] = useState<SubCategory[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<string>("");
  const [filteredSubCategory, setFilteredSubCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterData, setFilterData] = useState<Product[]>(data);

  // ru
  const [ruName, setRuName] = useState<string>("");
  const [ruDescription, setRuDescription] = useState<string>("");

  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Categories = await ProductService.getCategories();
        const SubCategories = await ProductService.getSubCategories();
        console.log(Categories.data);
        console.log(SubCategories.data);
        setFilterSubCategory(SubCategories.data);
        setFilterCategory(Categories.data);
      } catch (error) {
        console.log("Xato");
      }
    };

    fetchData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const deleteProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.getAttribute("data-id");
    ProductService.deleteProduct(id!).then(() => {
      window.location.href = "/";
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };

  const handleEditButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.getAttribute("data-id");
    const product = await ProductService.getProduct(id!);
    const categoriesRes = await ProductService.getCategories();
    const subCategoriesRes = await ProductService.getSubCategories();
    setName(product.data.uz.name);
    setDescription(product.data.uz.description);
    setRuName(product.data.ru.name);
    setRuDescription(product.data.ru.description);
    setCategory(product.data.category._id);
    setSubCategory(product.data.subCategory._id);
    setPrice(product.data.price);
    setCategories(categoriesRes.data);
    setSubCategories(subCategoriesRes.data);
    setProduct(product.data);
    openModal();
  };

  const handleEdit = () => {
    if (product) {
      ProductService.updateProduct(
        product._id,
        name,
        description,
        ruName,
        ruDescription,
        category,
        subCategory,
        price,
        selectedFile
      ).then(() => {
        window.location.href = "/";
      });
    }
  };

  if (!Array.isArray(data)) {
    return <div>Error: Invalid data format.</div>;
  }

  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilteredCategory(event.target.value);
    const newData = data.filter(
      (product) => product.category.uz.name === event.target.value
    );

    if (searchQuery) {
      const newDataSearch = newData.filter((product) =>
        product.uz.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilterData(newDataSearch);
      if (filteredSubCategory) {
        const newDataSubSearch = newDataSearch.filter(
          (product) => product.subCategory.uz.name === filteredCategory
        );
        setFilterData(newDataSubSearch);
      }
    } else if (!searchQuery && filteredSubCategory) {
      const newDataSub = newData.filter(
        (product) => product.subCategory.uz.name === filteredCategory
      );
      setFilterData(newDataSub);
    } else {
      setFilterData(newData);
    }
  }

  function handleSubCategoryChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setFilteredSubCategory(event.target.value);
    const newData = data.filter(
      (product) => product.subCategory.uz.name === event.target.value
    );

    if (searchQuery) {
      const newDataSearch = newData.filter((product) =>
        product.uz.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilterData(newDataSearch);
      if (filteredCategory) {
        const newDataSearchBase = newDataSearch.filter(
          (product) => product.category.uz.name === filteredCategory
        );
        setFilterData(newDataSearchBase);
      }
    } else if (!searchQuery && filteredCategory) {
      const newDataCat = newData.filter(
        (product) => product.category.uz.name === filteredCategory
      );
      setFilterData(newDataCat);
    } else {
      setFilterData(newData);
    }
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    const newsearchdata = data.filter((product) =>
      product.uz.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    if (filteredCategory) {
      const newDataSearch = newsearchdata.filter(
        (product) => product.category.uz.name === filteredCategory
      );
      setFilterData(newDataSearch);
      if (filteredSubCategory) {
        const newDataSubSearch = newDataSearch.filter(
          (product) => product.subCategory.uz.name === filteredSubCategory
        );
        setFilterData(newDataSubSearch);
      }
    } else if (!filteredCategory && filteredSubCategory) {
      const newDataSub = newsearchdata.filter(
        (product) => product.subCategory.uz.name === filteredSubCategory
      );
      setFilterData(newDataSub);
    } else {
      setFilterData(newsearchdata);
    }
  }

  console.log(data);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.table__filter}>
        <input
          className={styles.search}
          type="text"
          placeholder="Mahsulot nomini yozing..."
          onChange={handleSearchChange}
        />
        <select className={styles.select} onChange={handleCategoryChange}>
          <option selected disabled>
            Kategoriya tanlang
          </option>
          {filterCategory?.map((e) => (
            <option value={e.uz.name} key={e._id}>
              {e.uz.name}
            </option>
          ))}
        </select>
        <select className={styles.select} onChange={handleSubCategoryChange}>
          <option selected disabled>
            Sub-Kategoriya
          </option>
          {filterSubCategory?.map((e) => (
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
            <th>Mahsulot nomi</th>
            <th>Kategoriyasi</th>
            <th>Sub-Kategoriyasi</th>
            <th>Harakatlar</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((item, index) => (
            <tr key={item._id}>
              <td data-label="ID">{index + 1}</td>
              <td data-label="Name">{item.uz.name}</td>
              <td data-label="Category">{item.category.uz.name}</td>
              <td data-label="SubCategory">{item.subCategory.uz.name}</td>
              <td
                style={{
                  display: "flex",
                  gap: "5px",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
                data-label="Actions"
              >
                <button
                  className="button secondary"
                  onClick={deleteProduct}
                  data-id={item._id}
                >
                  O'chirish
                </button>
                <button
                  className="button primary"
                  onClick={handleEditButton}
                  data-id={item._id}
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
        <ProductsEditForm
          setName={setName}
          name={name}
          setDescription={setDescription}
          description={description}
          setRuName={setRuName}
          ruName={ruName}
          setRuDescription={setRuDescription}
          ruDescription={ruDescription}
          setPrice={setPrice}
          price={price}
          setCategory={setCategory}
          category={category}
          setSubCategory={setSubCategory}
          subCategory={subCategory}
          handleFileChange={handleFileChange}
          selectedFile={selectedFile}
          subCategories={subCategories}
          categories={categories}
        />
      </EditModal>
    </div>
  );
}
