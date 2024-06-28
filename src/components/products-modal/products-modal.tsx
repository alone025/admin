import { useState, ChangeEvent } from "react";
import CategoriesForm from "../categories-form/categories-form";
import SubCategoriesForm from "../subcategories-form/subcategories-form";
import ProductsForm from "../products-form/products-form";
import Modal from "../UI/modal/Modal";
import ProductService from "../../services/ProductService";

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


interface ProductsModalProps {
  tab: string;
  setTab: (tab: string) => void;
  categories: Category[];
  subCategories: SubCategory[];
  isModalOpen: boolean;
  closeModal: () => void;
}

export default function ProductsModal({
  tab,
  setTab,
  categories,
  subCategories,
  isModalOpen,
  closeModal,
}: ProductsModalProps) {
  const [name, setName] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryRuName, setCategoryRuName] = useState<string>("");
  const [subCategoryName, setSubCategoryName] = useState<string>("");
  const [subCategoryRuName, setSubCategoryRuName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // ru
  const [ruName, setRuName] = useState<string>("");
  const [ruDescription, setRuDescription] = useState<string>("");

  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    ruName: "",
    ruDescription: "",
    price: "",
    category: "",
    subCategory: "",
    file: "",
  });

  const [categoryErros, setCategoryErrors] = useState({
    categoryName: "",
    categoryRuName: "",
  });

  const [subCategoryErrors, setSubCategoryErrors] = useState({
    subCategoryName: "",
    subCategoryRuName: "",
    category: "",
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
 
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };

  const sendData = () => {
    if (tab == "products") {
      const newErrors = {
        name: name.trim() ? "" : "Iltimos nomini yozing",
        description: description.trim() ? "" : "iltimos haqidani yozing",
        ruName: ruName.trim() ? "" : "Iltimos rus tili nomini yozing",
        ruDescription: ruDescription.trim()
          ? ""
          : "Iltimos haqidani ruschasini yozing",
        price: price.trim() ? "" : "Iltimos narxini yozing",
        category: category ? "" : "Iltimos kategoriya tanlang",
        subCategory: subCategory ? "" : "Iltimos sub kategoriya tanlang",
        file: selectedFile ? "" : "Iltimos maxsulot rasmini tanlang",
      };
      setErrors(newErrors);

      ProductService.createProduct(
        name,
        description,
        ruName,
        ruDescription,
        category,
        subCategory,
        price,
        selectedFile
      ).then((data) => {
        console.log(data);
        closeModal();
        window.location.href = "/";
        setTab("products");
      });
    } else if (tab == "categories") {
      const ultimateErrors = {
        categoryName: categoryName.trim() ? "" : "Iltimos nomini yozing",
        categoryRuName: categoryRuName.trim()
          ? ""
          : "Iltimos ruscha nomini yozing",
      };

      setCategoryErrors(ultimateErrors);

      ProductService.createCategory(categoryName, categoryRuName).then(
        (data) => {
          console.log(data);
          closeModal();
          window.location.href = "/";
          setTab("categories");
        }
      );
    } else if (tab == "sub-categories") {
      const ultimateErrors = {
        subCategoryName: subCategoryName.trim() ? "" : "Iltimos nomini yozing",
        subCategoryRuName: subCategoryRuName.trim()
          ? ""
          : "Iltimos ruscha nomini yozing",
        category: category.trim() ? "" : "Kategoriya tanlang",
      };
      setSubCategoryErrors(ultimateErrors);

      ProductService.createSubCategory(
        subCategoryName,
        subCategoryRuName,
        category
      ).then((data) => {
        console.log(data);
        closeModal();
        window.location.href = "/";
        setTab("sub-categories");
      });
    }
  };

  if (tab == "products") {
    return (
      <Modal
        sendData={sendData}
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Mahsulot qo'shish"
      >
        <ProductsForm
          setName={setName}
          setDescription={setDescription}
          setRuName={setRuName}
          setRuDescription={setRuDescription}
          setPrice={setPrice}
          category={category}
          setCategory={setCategory}
          setSubCategory={setSubCategory}
          categories={categories}
          subCategories={subCategories}
          handleFileChange={handleFileChange}
          errors={errors}
        />
      </Modal>
    );
  } else if (tab == "categories") {
    return (
      <Modal
        sendData={sendData}
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Kategoriya qo'shish"
      >
        <CategoriesForm
          errors={categoryErros}
          setCategoryName={setCategoryName}
          setCategoryRuName={setCategoryRuName}
        />
      </Modal>
    );
  } else if (tab == "sub-categories") {
    return (
      <Modal
        sendData={sendData}
        isOpen={isModalOpen}
        onClose={closeModal}
        title="SubKategoriya qo'shish"
      >
        <SubCategoriesForm
          errors={subCategoryErrors}
          categories={categories}
          setCategory={setCategory}
          setSubCategoryName={setSubCategoryName}
          setSubCategoryRuName={setSubCategoryRuName}
        />
      </Modal>
    );
  }
}
