import { Suspense } from 'react';
import ProductListContent from './productListContent';
import { Category } from '@/types/Category';
import ProductListSkeleton from './productListSkeleton';

export default async function ProductList({ category }: { category: Category }) {
    return (
        <div>
            <Suspense fallback={<ProductListSkeleton />}>
                <ProductListContent category={category} />
            </Suspense>
        </div>
    )
};