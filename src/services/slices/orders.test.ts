import { IOrder } from '../../types';
import reducer from './orders';

const initStore = {
  orders: [],
  total: 0,
  totalToday: 0,
  connected: false
};

const testOrders: IOrder[] = [
  {
    _id: '62d995c342d34a001c27b6e6',
    name: 'Space флюоресцентный бургер',
    status: 'done',
    number: 20956,
    ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733c8'],
    createdAt: '2022-07-21T18:06:59.266Z'
  }
];

describe('orderSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initStore);
  });

  it('should handle connectStart', () => {
    expect(reducer(initStore, { type: 'orders/connectStart' })).toEqual({
      ...initStore,
      connected: true
    });
  });

  it('should handle connectStop', () => {
    expect(reducer(initStore, { type: 'orders/connectStop' })).toEqual({
      ...initStore,
      connected: false
    });
  });

  it('should handle updateOrders', () => {
    expect(
      reducer(initStore, {
        type: 'orders/updateOrders',
        payload: {
          orders: testOrders,
          total: 1,
          totalToday: 1
        }
      })
    ).toEqual({
      ...initStore,
      orders: testOrders,
      total: 1,
      totalToday: 1
    });
  });
});
