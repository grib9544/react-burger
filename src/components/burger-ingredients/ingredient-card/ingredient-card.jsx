import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ingredientType } from '../../../types';
import styles from './ingredient-card.module.css';

export const IngredientCard = (props) => {
  const location = useLocation();
  const { composition } = useSelector((state) => state.burger);

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
        <CurrencyIcon />
      </div>
      <span>{props.name}</span>
    </div>
  );
};

IngredientCard.propTypes = ingredientType.isRequired;
