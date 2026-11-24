import { getMeProfile } from "@/services/auth/getMeProfile";
import ProductCard from "../productCategorySections/productList/productCard";
import { getProductsById } from "@/services/product/getProductsById";

type DetailsPageProps = {
    params: Promise<{ id: string }>;
};

export default async function DetailsContent({ params }: DetailsPageProps) {
    const { id } = await params;
    const { user } = await getMeProfile();
    const product = await getProductsById(id);

    if (!product) {
        return (
            <div className="mt-5 p-8 text-center text-red-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                Belə bir məhsul tapılmadı!
            </div>
        )
    }
    return (
        <div className="w-[80%] p-4 m-auto">
            <ProductCard isDetail={false} product={product} user={user} />
        </div>
    )
};