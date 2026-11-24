"use server"

const API_URL = 'http://localhost:5000/api';

export async function GetCategories() {
    try {
        const response = await fetch(`${API_URL}/categories`, {
            next: {
                tags: ['categories'] // SSG kimi super sürətli işləyir, amma yeni kateqoriya əlavə olunanda dərhal yenilənir
            }
        })
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Catgerry gönderme zamanı xəta baş verdi');
        }
        return data;
    } catch (error) {
        console.log(error);
    }
};