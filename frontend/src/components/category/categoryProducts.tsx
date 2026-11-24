import { GetCategoryBySlug } from "@/services/category/getCategoryBySlug";
import ProductList from "../productCategorySections/productList/productList";

export default async function CategoryProducts({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const response = await GetCategoryBySlug(slug);
    console.log(response?.category, "gelen response");
    console.log(slug);
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Kateqoriya: {slug}</h1>
            {response?.category && <ProductList category={response?.category} />}
        </div>
    )
};