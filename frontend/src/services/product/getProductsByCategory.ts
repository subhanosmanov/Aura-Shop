const API_URL = 'http://localhost:5000/api';

export async function getProductsByCategory(categoryId: any) {
    try {
        const res: any = await fetch(`${API_URL}/products/category/${categoryId}`, {
            next: {
                tags: ['products'] // Bu sorğuya 'products' etiketi yapışdırırıq
            }
        });
        const data: any = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Product alma zamanı xəta baş verdi');
        }
        return data;
    } catch (error) {
        console.log(error);
    }
};