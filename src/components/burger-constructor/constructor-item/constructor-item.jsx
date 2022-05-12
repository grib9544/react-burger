import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { removeIngredient, swapFillings } from '../../../services/slices/burger';
import styles from './constructor-item.module.css';

export const ConstructorItem = (props) => {
  const dispatch = useDispatch();

  const { composId, itemType, isLocked, name, price, image } = props;

  const handleClose = () => {
    dispatch(removeIngredient({ composId }));
  };

  const handlerDrop = (targetId) => {
    dispatch(
      swapFillings({
        currentId: composId,
        targetId
      })
    );
  };

  const [, dragRef] = useDrag({
    type: 'constr',
    item: { composId }
  });

  const [, dropTarget] = useDrop({
    accept: 'constr',
    drop(item) {
      handlerDrop(item.composId);
    }
  });

  return (
    <div className={styles.item} ref={!isLocked ? dropTarget : null}>
      {isLocked || (
        <div className={styles.item__icon}>
          <DragIcon />
        </div>
      )}
      <div className={styles.item__element} ref={!isLocked ? dragRef : null}>
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
