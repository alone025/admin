// Define the structure for category data
export interface Category {
    _id: string;
    uz: {
        name: string;
    };
    ru: {
        name: string;
    };
}

// Define the structure for the props of the CategoriesTable component
export interface CategoriesTableProps {
    data: Category[];
}

// Define the structure for ProductService response (assuming it has a `data` field)
export interface ProductServiceResponse {
    data: {
        category: Category;
    };
}
