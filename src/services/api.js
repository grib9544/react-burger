import { API_URL } from '../constants';
import { FetchError } from '../error';

export async function fetchIngredients() {
  try {
    const response = await fetch(`${API_URL}/api/ingredients`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new FetchError(data.message);
    }

    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createOrder(ingredientsIds) {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: ingredientsIds
      })
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new FetchError(data.message);
    }

    return {
      orderId: data.order.number,
      name: data.name
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
