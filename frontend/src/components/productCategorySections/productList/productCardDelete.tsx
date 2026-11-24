"use client"
import DeleteProduct from "@/services/product/deleteProduct";
import { Product } from "@/types/Product";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function ProductCardDelete({ product }: { product: Product }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState<string>("");
    const handleDeleteProduct = (productId: string) => {
        setError("");

        startTransition(async () => {
            try {
                await DeleteProduct(productId);
                router.refresh()
            } catch (error: any) {
                console.error("Məhsul silinərkən xəta baş verdi:", error);
                setError(error?.message);
            }
        })
    };

    return (
        <div>
            {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                {error}
            </div>}
            <button
                onClick={() => handleDeleteProduct(product._id)}
                disabled={isPending}
                className="absolute cursor-pointer top-2 right-2 z-10 bg-white/90 hover:bg-white text-red-600 p-1.5 rounded-full shadow transition-colors disabled:opacity-50"
                title="Məhsulu sil"
            >
                {isPending ? <div> <svg className="animate-spin h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg></div> : "✕"}
            </button>
        </div>
    )
}
