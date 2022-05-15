import PropTypes, { shape } from 'prop-types';

export const ingredientType = shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_large: PropTypes.string
});
