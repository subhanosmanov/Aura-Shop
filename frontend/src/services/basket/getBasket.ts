const API_URL = 'http://localhost:5000/api';
import { cookies } from 'next/headers';

export async function getBasket(userId: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        const response = await fetch(`${API_URL}/basket/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Veriler çekilirken bir hata oluştu');
        }

        const data = await response.json();
    } catch (error: any) {
        console.log(error);
    }
}