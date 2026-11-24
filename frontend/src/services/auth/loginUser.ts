const API_URL = "http://localhost:5000/api";

export async function loginUser(userData: { email: string, password: string }) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Qeydiyyat zamanı xəta baş verdi');
        }

        return data;
    } catch (error) {
        console.log(error);
    }
}