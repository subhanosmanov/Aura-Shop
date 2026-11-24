"use client"

import { addBasket } from "@/services/basket/addBasket";
import { Product } from "@/types/Product";
import { User } from "@/types/User";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface ProductCardProps {
    product: Product,
    user: User,
    isDetail: boolean
}

export default function ProductCardActions({ product, user, isDetail }: ProductCardProps) {

    const initialIsInBasket = user?.basketList?.some(
        (b: Product) => b._id === product._id || b._id === product._id
    );

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isInBasket, setIsInBasket] = useState<boolean>(initialIsInBasket);
    console.log(user, "user melumatkarı")

    const handleViewDetails = () => {
        router.push(`/details/${product._id}`);
    };

    // Səbətə əlavə etmə / çıxarma əməliyyatı
    const handleToggleBasket = async () => {
        startTransition(async () => {
            try {
                await addBasket(product);
                setIsInBasket((prev: boolean) => !prev);
                router.refresh();
            } catch (error) {
                console.error("Səbət əməliyyatı zamanı xəta:", error);
            }
        })
    };

    return (
        <div className="flex justify-between items-center gap-3 mt-4">
            {isDetail && <button
                onClick={handleViewDetails}
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center"
            >
                Ətraflı
            </button>}

            <button
                onClick={handleToggleBasket}
                disabled={isPending}
                className={`cursor-pointer font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center text-white 
                ${isInBasket
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-amber-500 hover:bg-amber-600"
                    } 
                disabled:opacity-50`
                }
            >
                {isPending
                    ? "Gözləyin..."
                    : isInBasket
                        ? "Sil"
                        : "Əlavə et"}
            </button>
        </div>
    )
}
