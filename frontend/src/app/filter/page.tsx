import { Suspense } from "react";
import FilterSkeleton from "./filterSkeleton";
import ShopFilter from "@/components/shopFilter/shopFilter";
import { GetCategories } from "@/services/category/getCategories";

type FilterPageProps = {
    searchParams: Promise<{
        minPrice: string;
        maxPrice: string;
        sortBy: string;
        categoryId: string;
    }>;
};

export default async function Filter({ searchParams }: FilterPageProps) {
    return (
        <Suspense fallback={<FilterSkeleton />}>
            <ShopFilter searchParams={searchParams} />
        </Suspense>
    )
};