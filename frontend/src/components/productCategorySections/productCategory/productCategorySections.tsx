import { Suspense } from 'react';
import ProductCategorySectionsContent from './productCategorySectionsContent';
import ProductCategorySkeleton from './ProductCategorySkeleton';

export default function ProductCategorySections() {
    return (
        <div>
            <Suspense fallback={<ProductCategorySkeleton />}>
                <ProductCategorySectionsContent />
            </Suspense>
        </div>
    )
};