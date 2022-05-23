import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { removeIngredient, swapFillings } from '../../../services/slices/burger';
import { ingredientType } from '../../../types';
import styles from './constructor-item.module.css';

export const ConstructorItem = (props) => {
  const dispatch = useDispatch();

  const { ingredient, isLocked, itemType } = props;
  const { composId, name, price, image } = ingredient;

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
    <div ref={!isLocked ? dropTarget : null}>
      <div className={styles.item} ref={!isLocked ? dragRef : null}>
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
    </div>
  );
};

ConstructorItem.defaultProps = {
  isLocked: false
};

ConstructorItem.propTypes = {
  ingredient: ingredientType.isRequired,
  composId: PropTypes.string,
  itemType: PropTypes.oneOf(['top', 'bottom']),
  isLocked: PropTypes.bool
};
