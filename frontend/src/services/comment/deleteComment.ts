"use server"

import { cookies } from "next/headers";
const API_URL = 'http://localhost:5000/api';

export async function DeleteComment(productId: string, commentId: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token || token === "null" || token === "undefined") {
            throw new Error("Zəhmət olmasa əvvəlcə daxil olun (Login olun)!");
        }

        const response = await fetch(`${API_URL}/products/${productId}/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Şerh silinnen zaman xeta baş verdi!');
        }
        return data.comments;
    } catch (error) {
        console.log(error);
    }
};