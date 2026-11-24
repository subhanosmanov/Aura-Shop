"use server"

import { cookies } from "next/headers";
const API_URL = 'http://localhost:5000/api';

export async function AddComment(id: string, text: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token || token === "null" || token === "undefined") {
            throw new Error("Zəhmət olmasa əvvəlcə daxil olun (Login olun)!");
        }

        const response = await fetch(`${API_URL}/products/${id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text: text }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Rəy göndərilən zaman xəta baş verdi');
        }
        return data;
    } catch (error) {
        console.log(error);
    }
};