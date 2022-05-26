import { client } from './client';

export async function getIngredients() {
  const { data } = await client.get('/api/ingredients');
  return data.data;
}

export async function createOrder(ingredientsIds) {
  const { data } = await client.post('/api/orders', {
    ingredients: ingredientsIds
  });

  return {
    orderId: data.order.number,
    name: data.name
  };
}
