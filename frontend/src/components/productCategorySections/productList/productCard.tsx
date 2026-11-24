import ProductCardDelete from './productCardDelete';
import ProductCardActions from './productCardActions';
import Comments from '../../comments/comments';
import { Product } from '@/types/Product';
import { User } from '@/types/User';

interface ProductCardProps {
    product: Product,
    user: User,
    isDetail: boolean
}

export default function ProductCard({ product, user, isDetail = true }: ProductCardProps) {

    return (
        <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">

            {/* Məhsul Şəkli */}
            <div className="relative w-full h-48 bg-gray-50 overflow-hidden flex items-center justify-center">
                {user?.role === "admin" && (
                    <ProductCardDelete product={product} />
                )}

                {product.images ? (
                    <img
                        src={`http://localhost:5000${product.images[0]}`}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <span className="text-xs text-gray-400">Şəkil yoxdur</span>
                )}
            </div>

            {/* Məhsul Məlumatları */}
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-semibold text-gray-800 text-base line-clamp-2 group-hover:text-amber-600 transition-colors">
                        {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {product.description}
                    </p>
                    {product.price && (
                        <p className="mt-2 text-lg font-bold text-gray-900">
                            {product.price} ₼
                        </p>
                    )}
                </div>

                {/* Düymələr */}
                <ProductCardActions isDetail={isDetail} product={product} user={user} />
            </div>

            {!isDetail && <Comments product={product} user={user} />}
        </div>
    )
}
