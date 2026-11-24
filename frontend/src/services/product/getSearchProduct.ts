const API_URL = 'http://localhost:5000/api';

export async function getSearchProduct(query: any) {
    try {
        const response: any = await fetch(`${API_URL}/products/search?query=${query}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Product alma zamanı xəta baş verdi');
        }
        return data.products;
    } catch (err) {
        console.log(err);
    }
}