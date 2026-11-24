"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
const API_URL = 'http://localhost:5000/api';

export async function CreateProduct(userData: {
    title: string,
    description: string,
    price: string,
    stock: string,
    category: string,
    images: File | null
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const formData = new FormData();

    formData.append('title', userData.title);
    formData.append('description', userData.description);
    formData.append('price', userData.price);
    formData.append('stock', userData.stock);
    formData.append('category', userData.category);

    if (userData.images) {
        formData.append('images', userData.images); // Backend-də upload.single('images') olduğu üçün ad 'images' olmalıdır
    }
    try {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                Cookie: `token=${token}`
            },
            body: formData,
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Product gönderme zamanı xəta baş verdi');
        }
        // @ts-ignore
        revalidateTag('products');
        return data;
    } catch (error) {
        console.log(error);
    }
};