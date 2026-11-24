const API_URL = 'http://localhost:5000/api';

interface filterProductsType {
    minPrice: string,
    maxPrice: string,
    sortBy: string,
    categoryId: string
}
export async function GetFilterProducts({ minPrice, maxPrice, sortBy, categoryId }: filterProductsType) {
    try {
        const response = await fetch(`${API_URL}/products/filter?&minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortBy}&&categoryId=${categoryId}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Product alma zamanı xəta baş verdi');
        }
        return data.products;
    } catch (error) {
        console.log(error);
    }
};