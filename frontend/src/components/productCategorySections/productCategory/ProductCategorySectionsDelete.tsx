"use client"

import DeleteCategory from "@/services/category/deleteCategory";
import { Category } from "@/types/Category";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function ProductCategorySectionsDelete({ category }: { category: Category }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const [error, setError] = useState("");

    const deleteCategoryHandler = (id: string) => {
        setError("");
        startTransition(async () => {
            try {
                const data = await DeleteCategory(id);
                // window.location.reload();
                router.refresh();
            } catch (error: any) {
                console.log(error);
                setError(error?.message || "Kateqoriya silinərkən xəta baş verdi.")
            }
        })
    }

    return (
        <div>
            {error &&
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                    {error}</div>}
            <button
                type="button"
                disabled={isPending}
                onClick={() => deleteCategoryHandler(category._id)}
                className="p-1.5 text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 border border-gray-200 rounded-full shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center">
                {isPending ? <div><svg className="animate-spin h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg> </div> : "✕"}
            </button>
        </div>
    )
}
