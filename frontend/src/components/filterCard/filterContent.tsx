"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/types/Category";
import { GetCategories } from "@/services/category/getCategories";
import { discoverValidationDepths } from "next/dist/server/app-render/instant-validation/instant-validation";

export default function FilterContent() {
    const router = useRouter();
    const [categoryId, setCategoryId] = useState<string>("");
    const [minPrice, setMinPrice] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("latest");
    const [categories, setCategories] = useState<Category[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    const handleApplyFilters = async () => {
        console.log(categoryId)
        router.push(`/filter?minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortBy}&categoryId=${categoryId}`);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await GetCategories();
                setCategories(res?.categories);
            } catch (error) {
                console.error("Kateqoriyalar yüklənərkən xəta:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {/* Kateqoriya filteri */}
            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Kateqoriya</label>
                <select
                    disabled={loading}
                    value={categoryId}
                    onChange={(e: any) => setCategoryId(e.target.value)}
                    className="mt-1 block rounded-md border-gray-300 shadow-sm p-2 border"
                >
                    <option value="" disabled>
                        {loading ? "Kateqoriyalar yüklənir..." : "Kateqoriyalar"}
                    </option>
                    {categories?.map((category: Category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Qiymət aralığı */}
            <div className="mb-3 flex gap-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Min Qiymət</label>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinPrice(e.target.value)}
                        placeholder="0"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Max Qiymət</label>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e: any) => setMaxPrice(e.target.value)}
                        placeholder="1000"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    />
                </div>
            </div>

            {/* Sıralama (Sort By) */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Sıralama</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="mt-1 block rounded-md border-gray-300 shadow-sm p-2 border"
                >
                    <option value="latest">Ən yenilər</option>
                    <option value="price_asc">Qiymətə görə (Artan)</option>
                    <option value="price_desc">Qiymətə görə (Azalan)</option>
                </select>
            </div>

            {/* Tətbiq et düyməsi */}
            <button
                onClick={handleApplyFilters}
                className="bg-blue-600 p-3 text-white p-2 rounded-md hover:bg-blue-700 transition"
            >
                Filtri Tətbiq Et
            </button>
        </div>
    )
}
