"use client";

import { CreateCategory } from "@/services/category/createCategory";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function AddCategory() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

   function handleAddCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!name || !slug || !image) {
      console.log("Bütün xanalar doldurulmalıdır!");
      return;
    }
    startTransition(async () => {
      try {
        const res = await CreateCategory({ name, slug, image });
        setName("");
        setSlug("");
        setImage("");
        // window.location.reload();
        router.refresh();
      } catch (error: any) {
        console.error("XƏTA BAŞ VERDİ:", error);
        setError(error?.message)
      }
    })
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span>📁</span> Yeni Kateqoriya Yarat
      </h2>

      <form onSubmit={handleAddCategory} className="w-full flex flex-col justify-between space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Kateqoriya Adı</label>
          <input
            type="text"
            placeholder="Məsələn: Elektronika"
            value={name}
            onChange={handleNameChange}
            className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Slug (URL)</label>
          <input
            type="text"
            placeholder="elektronika"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm bg-gray-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Kateqoriya Şəkli (URL)</label>
          <input
            type="text"
            placeholder="https://example.com/category.jpg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
            required
          />
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        <button
          disabled={isPending}
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition shadow-sm mt-2"
        >
          {isPending ? "yuklenir..." : "Kateqoriya Əlavə Et"}
        </button>
      </form>
    </div>
  )
}