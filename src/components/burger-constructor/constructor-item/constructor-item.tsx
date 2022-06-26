import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { removeIngredient, swapFillings } from '../../../services/slices/burger';
import { IComposeIngredient, TAppDispatch } from '../../../types';
import styles from './constructor-item.module.css';

type TConstructorItemProps = {
  ingredient: IComposeIngredient;
  itemType?: 'top' | 'bottom';
  isLocked?: boolean;
};

export const ConstructorItem: FC<TConstructorItemProps> = ({ ingredient, itemType, isLocked }) => {
  const dispatch = useDispatch<TAppDispatch>();

  const { composId, name, price, image } = ingredient;

  const handleClose = () => {
    dispatch(removeIngredient({ composId }));
  };

  const handlerDrop = (targetId: string) => {
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
    drop(item: IComposeIngredient) {
      handlerDrop(item.composId);
    }
  });

  return (
    <div ref={!isLocked ? dropTarget : null}>
      <div className={styles.item} ref={!isLocked ? dragRef : null}>
        {isLocked || (
          <div className={styles.item__icon}>
            <DragIcon type="primary" />
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
