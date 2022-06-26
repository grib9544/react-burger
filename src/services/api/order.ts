import { IIngredient } from '../../types';
import { client } from './client';

export async function getIngredients(): Promise<IIngredient[]> {
  const { data } = await client.get('/api/ingredients');
  return data.data;
}

export interface IOrderRes {
  orderId: number;
  name: string;
}

export async function createOrder(ingredientsIds: IIngredient['_id'][]): Promise<IOrderRes> {
  const { data } = await client.post('/api/orders', {
    ingredients: ingredientsIds
  });

  return {
    orderId: data.order.number,
    name: data.name
  };
}
