"use server"

import { cookies } from "next/headers";

const API_URL = "http://localhost:5000/api";

export default async function DeleteCategory(id: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    try {
        const response: any = await fetch(`${API_URL}/categories/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                Cookie: `token=${token}`
            },
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Delete zamanı xəta baş verdi');
        }
        return data;

    } catch (error) {
        console.log(error);
    }
};