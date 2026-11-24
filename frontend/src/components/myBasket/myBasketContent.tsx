import { getMeProfile } from '@/services/auth/getMeProfile';
import ProductCard from '../productCategorySections/productList/productCard';
import { Product } from '@/types/Product';

export default async function MyBasketContent() {
    const { user } = await getMeProfile();

    let basketList = [];
    basketList = user?.basketList;

    return (
        <div className='w-full p-4'>
            <h2 className='font-bold text-xl mb-3'><span className='text-red-600'>Səbətə</span> əlavə etdiyiniz məhsulların sayı: {basketList?.length === 0 ? <span className='text-red-600'>0</span> : <span className='text-green-600'>{basketList?.length}</span>}</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                {basketList &&
                    basketList?.length === 0 ? <h2>Səbətinizdə heç bir məhsul yoxdur!</h2> :
                    basketList?.map((product: Product) => (
                        <ProductCard key={product._id} product={product} user={user} isDetail={true} />
                    ))}
            </div>
        </div>
    )
}
