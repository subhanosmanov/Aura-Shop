import { GetCategories } from "@/services/category/getCategories";
import AddProductForm from "./addProductForm";

export default async function AddProduct() {
  let categories = [];

  try {
    const response = await GetCategories();
    categories = response.categories;
    console.log("gelen butun categooriesleer", categories);
  } catch (err) {
    console.log(err);
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span>📦</span> Yeni Məhsul Əlavə Et
      </h2>
      <AddProductForm categories={categories} />
    </div>
  )
}
