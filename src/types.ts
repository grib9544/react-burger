import { Location } from 'history';
import PropTypes, { shape } from 'prop-types';
import { store } from './services/slices';

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;

export type TLocation = {
  from?: string;
  fromForgot?: string;
  background?: Location;
};

export interface IUser {
  email: string;
  name: string;
}

export type TIngredientType = 'sauce' | 'bun' | 'main';

export interface IIngredient {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
}

export interface IComposeIngredient extends IIngredient {
  composId: string;
}

export const ingredientType = shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['sauce', 'bun', 'main']),
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string
});
