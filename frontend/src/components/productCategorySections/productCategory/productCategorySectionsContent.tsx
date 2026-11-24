import { getMeProfile } from '@/services/auth/getMeProfile';
import { GetCategories } from '@/services/category/getCategories';
import Link from "next/link";
import ProductCategorySectionsDelete from './ProductCategorySectionsDelete';
import ProductList from '../productList/productList';
import { Category } from '@/types/Category';

export default async function ProductCategorySectionsContent() {
    let categoryList: Category[] = [];

    const { user } = await getMeProfile();
    const response = await GetCategories();
    categoryList = response?.categories;
    console.log("gelen category list", categoryList)

    return (
        <div>
            {categoryList?.map((category: Category) => (
                <div key={category._id} className="flex flex-col gap-4 p-3">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <h2>{category.name}</h2>
                            {user?.role === "admin" &&
                                <ProductCategorySectionsDelete category={category} />
                            }
                        </div>
                        <Link href={`/category/${category?.slug}`} className="hover:text-orange-400 transition-colors duration-200">Hamısına bax</Link>
                    </div>
                    <ProductList category={category}/>
                </div>
            ))}
        </div>
    )
};