const API_URL = 'http://localhost:5000/api';

export async function GetCategoryBySlug(slug: string) {
    try {
        const response = await fetch(`${API_URL}/categories/${slug}`, {
            cache: 'no-store'
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Catgerry gönderme zamanı xəta baş verdi');
        }
        return data;
    } catch (error) {
        console.log(error);
    }
};