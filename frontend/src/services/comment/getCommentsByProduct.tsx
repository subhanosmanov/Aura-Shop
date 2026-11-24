const API_URL = 'http://localhost:5000/api';

export async function GetCommentsByProduct(id: string) {
    try {
        const response = await fetch(`${API_URL}/products/${id}/comments`,{
            cache: 'no-store'
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Catgerry gönderme zamanı xəta baş verdi');
        }
        return data.comments;
    } catch (error) {
        console.log(error);
    }
};