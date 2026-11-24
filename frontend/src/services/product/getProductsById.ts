const API_URL = 'http://localhost:5000/api';

export async function getProductsById(id: string | any) {
    try {
        if (!id) {
            return;
        }
        const response: any = await fetch(`${API_URL}/products/${id}`, {
            next: {
                tags: ['products'] // Bu sorğuya 'products' etiketi yapışdırırıq
            }
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Product alma zamanı xəta baş verdi');
        }
        return data.product;
    } catch (error) {
        console.log(error);
    }
}