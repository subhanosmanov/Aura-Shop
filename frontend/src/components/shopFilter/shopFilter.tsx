import { GetFilterProducts } from "@/services/product/filterProducts";
import ProductCard from "../productCategorySections/productList/productCard";
import { getMeProfile } from "@/services/auth/getMeProfile";
import { Product } from "@/types/Product";

type FilterPageProps = {
    searchParams: Promise<{
        minPrice: string;
        maxPrice: string;
        sortBy: string;
        categoryId: string;
    }>
};

export default async function ShopFilter({ searchParams }: FilterPageProps) {
    const { minPrice, maxPrice, sortBy, categoryId } = await searchParams;
    const { user } = await getMeProfile();
    const products = await GetFilterProducts({ minPrice, maxPrice, sortBy, categoryId });

    return (
        <div className='w-full p-4'>
            <h2 className='font-bold text-xl mb-3'><span className='text-red-600'>Filter</span> Axtarışınıza uyğun nəticələr:</h2>
            {products?.length === 0 ? <div>Heç bir məhsul tapılmadı :/</div> :
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                    {products?.map((product: Product) => (
                        <ProductCard key={product._id} product={product} user={user} isDetail={true} />
                    ))}
                </div>}
        </div>
    )
};