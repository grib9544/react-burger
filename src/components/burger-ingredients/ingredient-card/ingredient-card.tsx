import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { IIngredient, TRootState } from '../../../types';
import styles from './ingredient-card.module.css';

type TIngredientCardPropd = Pick<IIngredient, '_id' | 'type' | 'name' | 'image' | 'price'>;

export const IngredientCard: FC<TIngredientCardPropd> = (props) => {
  const { composition } = useSelector((state: TRootState) => state.burger);

  const [count, setCount] = useState(0);

  const [{ opacity }, dragRef] = useDrag({
    type: 'composition',
    item: { _id: props._id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.3 : 1
    })
  });

  useEffect(() => {
    if (props.type === 'bun' && composition.bun?._id === props._id) {
      setCount(2);
      return;
    }

    const fillingCount = composition.filling.filter((ing) => ing._id === props._id).length;
    setCount(fillingCount);
  }, [composition, props._id, props.type]);

  return (
    <div className={styles.ingredient} style={{ opacity }}>
      {!!count && <Counter count={count} size="default" />}
      <img src={props.image} alt={props.name} className={styles.ingredient__img} ref={dragRef} />
      <div className={styles.ingredient__price}>
        <span className="text text_type_digits-default">{props.price}</span>
        <CurrencyIcon type={'primary'} />
      </div>
      <span>{props.name}</span>
    </div>
  );
};
