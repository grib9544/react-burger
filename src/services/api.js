import { API_URL } from '../constants';
import { FetchError } from '../error';

function checkResponse(res) {
  if (!res.ok || !res.success) {
    throw new FetchError(res.message);
  }
}

export async function fetchIngredients() {
  const res = await fetch(`${API_URL}/api/ingredients`);
  checkResponse(res);

  const data = await res.json();
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

  checkResponse(res);

  const data = await res.json();
  return {
    orderId: data.order.number,
    name: data.name
  };
}
