import { getMeProfile } from '@/services/auth/getMeProfile';
import { getProductsByCategory } from '@/services/product/getProductsByCategory';
import ProductCard from './productCard';
import { Product } from '@/types/Product';
import { Category } from '@/types/Category';

export default async function ProductListContent({ category }: { category: Category }) {
  const { user } = await getMeProfile();
  console.log(user, "gəlen user siyahısi");
  let productList = await getProductsByCategory(category._id);

  return (
    <div className='w-full'>
      {productList.length === 0 ? (
        <div className="py-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          Bu kateqoriyada hələ ki məhsul yoxdur.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productList.map((product: Product) => (
            <ProductCard key={product._id} product={product} user={user} isDetail={true} />
          ))}
        </div>
      )}
    </div>
  )
}
