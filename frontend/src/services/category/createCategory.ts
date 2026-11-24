"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
const API_URL = 'http://localhost:5000/api';

export async function CreateCategory(userData: { name: string, slug: string, image: string }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    try {
        const response = await fetch(`${API_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                Cookie: `token=${token}`
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Catgerry gönderme zamanı xəta baş verdi');
        }
        // @ts-ignore
        revalidateTag('categories');
        return data;
    } catch (error: any) {
        console.error("CreateCategory daxilində xəta:", error?.message);
        throw error;
    }
};