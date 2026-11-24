"use server"

import { cookies } from 'next/headers';
const API_URL = "http://localhost:5000/api";

export async function getMeProfile() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return { user: null, token: null };

    try {
        const res = await fetch(`${API_URL}/auth/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                Cookie: `token=${token}`,
            },
            cache: 'no-store', // SSR
        });

        if (!res.ok) {
            console.log("Backend /auth/me xəta qayıtdı:", res.status);
            return { user: null, token: null };
        }

        const data = await res.json();
        return { user: data.user || data, token };
    } catch (error) {
        console.error("getMeProfile fetch xətası:", error);
        return { user: null, token: null };
    }
}