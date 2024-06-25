import ProductService from "../../services/ProductService";
import EditModal from "../UI/edit-modal/EditModal";
import ProductsEditForm from "./components/products-edit";
import styles from "./products-table.module.scss";
import { ChangeEvent, useEffect, useState } from "react";

export default function ProductsTable({ data }: { data: any }) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [filterCategory, setFilterCategory] = useState<any>();
  const [filterSubCategory, setFilterSubCategory] = useState<any>();
  const [filteredCategory, setFilteredCategory] = useState<any>();
  const [filteredSubCategory, setFilteredSubCategory] = useState<any>();
  const [searchqueary, setsearchquery] = useState<any>();
  const [filterData, setFilterData] = useState<any>(data);

  // ru
  const [ruName, setRuName] = useState<string>("");
  const [ruDescription, setRuDescription] = useState<string>("");

  const [category, setCategory] = useState<any>([]);
  const [subCategory, setSubCategory] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [subCategories, setSubCategories] = useState<any>([]);
  const [product, setProduct] = useState<any>();
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

  const deleteProduct = (event: any) => {
    const id = event.target.getAttribute("data-id");
    ProductService.deleteProduct(id).then(() => {
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

  const handleEditButton = async (event: any) => {
    const id = event.target.getAttribute("data-id");
    const product = await ProductService.getProduct(id);
    const categoriesRes = await ProductService.getCategories();
    const subCategoriesRes = await ProductService.getSubCategories();
    setName(product.data.uz.name);
    setDescription(product.data.uz.description);
    setRuName(product.data.ru.description);
    setRuDescription(product.data.ru.description);
    setCategory(product.data.category);
    setSubCategory(product.data.subCategory);
    setPrice(product.data.price);
    setCategories(categoriesRes.data);
    setSubCategories(subCategoriesRes.data);
    setProduct(product.data);
    openModal();
  };

  const handleEdit = () => {
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
  };

  if (!Array.isArray(data)) {
    return <div>Error: Invalid data format.</div>;
  }

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
      if (filteredSubCategory) {
        const newDataSubSearch = newDataSearch.filter(
          (product) => product.subCategory.uz.name === filteredCategory
        );
        setFilterData(newDataSubSearch);
      }
    } else if (!searchqueary && filteredSubCategory) {
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

    if (searchqueary) {
      const newDataSearch = newData.filter((product) =>
        product.uz.name.toLowerCase().includes(searchqueary.toLowerCase())
      );
      setFilterData(newDataSearch);
      if (filteredCategory) {
        const newDataSearchBase = newDataSearch.filter(
          (product) => product.Category.uz.name === filteredCategory
        );
        setFilterData(newDataSearchBase);
      }
    } else if (!searchqueary && filteredCategory) {
      const newDataCat = newData.filter(
        (product) => product.category.uz.name === filteredCategory
      );
      setFilterData(newDataCat);
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
          {filterCategory?.map((e: any, ec: any) => (
            <option value={e.uz.name} key={ec}>
              {e.uz.name}
            </option>
          ))}
        </select>
        <select className={styles.select} onChange={handleSubCategoryChange}>
          <option selected disabled>
            Sub-Kategoriya
          </option>
          {filterSubCategory?.map((e: any, ec: any) => (
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
            <th>Mahsulot nomi</th>
            <th>Kategoriyasi</th>
            <th>Sub-Kategoriyasi</th>
            <th>Harakatlar</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map(
            (item: any, index: number) => (
              console.log("Product", item.uz),
              (
                <tr key={item.id}>
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
              )
            )
          )}
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
          subCategory={subCategories}
          handleFileChange={handleFileChange}
          selectedFile={selectedFile}
          subCategories={subCategories}
          categories={categories}
        />
      </EditModal>
    </div>
  );
}
