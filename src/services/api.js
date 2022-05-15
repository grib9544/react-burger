import { API_URL } from '../constants';
import { FetchError } from '../error';

async function checkResponse(res) {
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new FetchError(res.message);
  }

  return data;
}

export async function fetchIngredients() {
  const res = await fetch(`${API_URL}/api/ingredients`);

  const data = await checkResponse(res);
  return data.data;
}

export async function createOrder(ingredientsIds) {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: ingredientsIds
    })
  });

  const data = await checkResponse(res);
  return {
    orderId: data.order.number,
    name: data.name
  };
}
