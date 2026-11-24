"use client";

import { CreateProduct } from '@/services/product/createProduct';
import { useState, useTransition } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Category } from '@/types/Category';

export default function AddProductForm({ categories }: { categories: Category[] }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [stock, setStock] = useState<string>("");
    const [category, setSelectedCategory] = useState<string>("");

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string>("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(e.target.files?.[0], "fayl;")
        if (file) {
            setImageFile(file);
        }
    };

    function handleAddProduct(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        startTransition(async () => {
            try {
                const res = await CreateProduct({
                    title,
                    description,
                    price,
                    stock,
                    category,
                    images: imageFile
                });
                setTitle("");
                setDescription("");
                setPrice("");
                setStock("");
                setSelectedCategory("");
                setImageFile(null);
                setImageUrl(null);

                router.refresh();
            } catch (error: any) {
                console.error("Məhsul əlavə edilərkən xəta:", error);
                setError(error?.message);
            }
        })
    }
    return (
        <form
            onSubmit={handleAddProduct}
            className="space-y-4">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Məhsulun Adı</label>
                <input
                    type="text"
                    placeholder="Məsələn: Wireless Headphones"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Məhsul Haqqında (Description)</label>
                <textarea
                    placeholder="Məhsulun xüsusiyyətlərini qeyd edin..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm h-20 resize-none"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Qiymət (AZN)</label>
                    <input
                        type="number"
                        placeholder="150"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Stok Sayı (Stock)</label>
                    <input
                        type="number"
                        placeholder="25"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Kateqoriya Seçin</label>
                <select
                    value={category}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm bg-white"
                    required
                >
                    <option value="" disabled>
                        Kateqoriya seçin
                    </option>
                    {categories?.map((category: Category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Məhsul Şəkli (Fayl seçin)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border border-gray-200 p-2.5 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer"
                        required
                    />
                </div>

                {/* Seçilən şəklin önizləməsi (Preview) */}
                {imageUrl && (
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                        <Image
                            src={imageUrl}
                            alt="Şəkil önizləməsi"
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
            </div>

            {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                    {error}
                </div>
            )}
            <button
                disabled={isPending}
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm mt-2"
            >
                {isPending ? "Məhsul yuklenir" : "Məhsul Əlavə Et"}
            </button>
        </form>
    )
};