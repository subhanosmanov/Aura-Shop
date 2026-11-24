import CategoryProducts from "@/components/category/categoryProducts";
import { Suspense } from "react";
import CategorySpinner from "../categorySpinner";

type CategoryPageProps = {
    params: Promise<{ slug: string }>;
};

export default function Category({ params }: CategoryPageProps) {
    return (
        <div className="px-4 py-8">
            <Suspense fallback={<CategorySpinner />}>
                <CategoryProducts params={params} />
            </Suspense>
        </div>
    )
}