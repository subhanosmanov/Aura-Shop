"use server"

import { cookies } from "next/headers";

const API_URL = 'http://localhost:5000/api'; 

export async function RemoveUser() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        const response = await fetch(`${API_URL}/auth/delete-account`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Delete zamanı xəta baş verdi');
        }

        return data;
    } catch (error: any) {
        throw new Error(error.message || 'Serverə qoşulmaq mümkün olmadı');
    }
}