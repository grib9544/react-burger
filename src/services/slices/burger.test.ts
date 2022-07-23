import { IIngredient } from '../../types';
import { randomAlphaNumeric } from '../../utils';
import reducer from './burger';

const initStore = {
  ingredients: {
    items: [],
    loading: false,
    error: null
  },
  composition: {
    bun: null,
    filling: []
  },
  order: {
    loading: false,
    error: null,
    orderId: null
  },
  totalCost: 0,
  viewedIngredient: null
};

const testIngredients: IIngredient[] = [
  {
    _id: '60d3b41abdacab0026a733c6',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '60d3b41abdacab0026a733cd',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
  },
  {
    _id: '60d3b41abdacab0026a733d2',
    name: 'Кристаллы марсианских альфа-сахаридов',
    type: 'main',
    proteins: 234,
    fat: 432,
    carbohydrates: 111,
    calories: 189,
    price: 762,
    image: 'https://code.s3.yandex.net/react/code/core.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/core-large.png'
  }
];

describe('burgerSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initStore);
  });

  it('should handle setIngredient (bun)', () => {
    const testBun = testIngredients[0];

    const testReducer = reducer(
      {
        ...initStore,
        ingredients: {
          ...initStore.ingredients,
          items: testIngredients
        }
      },
      { type: 'burger/setIngredient', payload: { _id: testBun._id } }
    );

    expect(testReducer.composition.bun?._id).toEqual(testBun._id);
    expect(testReducer.composition.filling).toEqual([]);
    expect(testReducer.totalCost).toEqual(testBun.price * 2);
  });

  it('should handle setIngredient (not bun)', () => {
    const testSauce = testIngredients[1];

    const testReducer = reducer(
      {
        ...initStore,
        ingredients: {
          ...initStore.ingredients,
          items: testIngredients
        }
      },
      { type: 'burger/setIngredient', payload: { _id: testSauce._id } }
    );

    expect(testReducer.composition.filling).toHaveLength(1);
    expect(testReducer.composition.bun).toBeNull();
    expect(testReducer.totalCost).toEqual(testSauce.price);
  });

  it('should handle removeIngredient', () => {
    const testIngredient = {
      ...testIngredients[1],
      composId: randomAlphaNumeric()
    };

    const testReducer = reducer(
      {
        ...initStore,
        composition: {
          ...initStore.composition,
          filling: [testIngredient]
        },
        totalCost: testIngredient.price
      },
      { type: 'burger/removeIngredient', payload: { composId: testIngredient.composId } }
    );

    expect(testReducer.composition.filling).toEqual([]);
    expect(testReducer.totalCost).toEqual(0);
  });

  it('should handle swapFillings', () => {
    const testIngredientOne = {
      ...testIngredients[1],
      composId: randomAlphaNumeric()
    };

    const testIngredientTwo = {
      ...testIngredients[2],
      composId: randomAlphaNumeric()
    };

    const testReducer = reducer(
      {
        ...initStore,
        composition: {
          ...initStore.composition,
          filling: [testIngredientOne, testIngredientTwo]
        }
      },
      {
        type: 'burger/swapFillings',
        payload: {
          currentId: testIngredientOne.composId,
          targetId: testIngredientTwo.composId
        }
      }
    );

    expect(testReducer.composition.filling).toEqual([testIngredientTwo, testIngredientOne]);
  });

  it('should handle setViewedIngredient', () => {
    const testIngredient = testIngredients[2];

    const testReducer = reducer(
      {
        ...initStore,
        ingredients: {
          ...initStore.ingredients,
          items: testIngredients
        }
      },
      { type: 'burger/setViewedIngredient', payload: testIngredient }
    );

    expect(testReducer.viewedIngredient).toEqual(testIngredient);
  });

  it('should handle unsetViewedIngredient', () => {
    const testIngredient = testIngredients[2];

    const testReducer = reducer(
      {
        ...initStore,
        viewedIngredient: testIngredient
      },
      { type: 'burger/unsetViewedIngredient' }
    );

    expect(testReducer.viewedIngredient).toBeNull();
  });
});
