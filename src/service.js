import { API_URL } from './constants';

export async function fetchIngredients() {
    try {
        const response = await fetch(`${API_URL}/api/ingredients`);
        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message);
        }
        
        return data.data
    } catch (error) {
        throw new Error(error.message);
    }
}