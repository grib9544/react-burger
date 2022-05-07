import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '../../../services/slices/burger';
import styles from './constructor-item.module.css';

export const ConstructorItem = (props) => {
  const dispatch = useDispatch();

  const { composId, itemType, isLocked, name, price, image } = props;

  const handleClose = () => {
    dispatch(removeIngredient({ composId }));
  };

  return (
    <div className={styles.item}>
      {isLocked || (
        <div className={styles.item__icon}>
          <DragIcon />
        </div>
      )}
      <div className={styles.item__element}>
        <ConstructorElement
          type={itemType}
          isLocked={isLocked}
          text={name}
          price={price}
          thumbnail={image}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

ConstructorItem.defaultProps = {
  isLocked: false
};

ConstructorItem.propTypes = {
  _id: PropTypes.string.isRequired,
  composId: PropTypes.string.isRequired,
  itemType: PropTypes.oneOf(['top', 'bottom']),
  isLocked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
};
