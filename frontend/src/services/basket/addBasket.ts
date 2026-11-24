"use server"

const API_URL = 'http://localhost:5000/api';
import { Product } from '@/types/Product';
import { cookies } from 'next/headers';

export async function addBasket(product: Product) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        const response = await fetch(`${API_URL}/basket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productId: product._id }),
        });

        if (!response.ok) {
            throw new Error('Veriler çekilirken bir hata oluştu');
        }

        const data = await response.json();
    } catch (error: any) {
        console.log(error);
    }
}