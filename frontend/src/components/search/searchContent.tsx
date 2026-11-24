import { getMeProfile } from '@/services/auth/getMeProfile';
import { getSearchProduct } from '@/services/product/getSearchProduct';
import ProductCard from '../productCategorySections/productList/productCard';
import { Product } from '@/types/Product';

type SearchPageProps = {
    searchParams: Promise<{ query: string }>;
};

export default async function SearchContent({ searchParams }: SearchPageProps) {
    const { query } = await searchParams;
    const { user } = await getMeProfile();
    const products = await getSearchProduct(query);
    
    return (
        <div className='w-full p-4'>
            <h2 className='font-bold text-xl mb-3'>Sizin axtarışınız: <span className='text-red-600'>{query}</span></h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                {products?.length === 0 ? <div>Heç bir nəticə tapılmadı :/</div> :
                    products?.map((product: Product) => (
                        <ProductCard key={product._id} product={product} user={user} isDetail={true}/>
                    ))}
            </div>
        </div>
    )
};