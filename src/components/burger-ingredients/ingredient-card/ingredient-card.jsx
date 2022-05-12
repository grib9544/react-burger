import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { setViewedIngredient, unsetViewedIngredient } from '../../../services/slices/burger';
import { IngredientDetails } from '../../ingredient-details/ingredient-details';
import { Modal } from '../../modal/modal';
import styles from './ingredient-card.module.css';

export const IngredientCard = (props) => {
  const dispatch = useDispatch();
  const { composition } = useSelector((state) => state.burger);

  const [count, setCount] = useState(0);
  const [visibility, setVisibility] = useState(false);

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

  const onClick = () => {
    setVisibility(true);
    dispatch(setViewedIngredient(props));
  };

  const onClose = () => {
    setVisibility(false);
    dispatch(unsetViewedIngredient());
  };

  return (
    <>
      {visibility && (
        <Modal title="Детали ингредиента" onClose={onClose}>
          <IngredientDetails {...props} />
        </Modal>
      )}
      <div className={styles.ingredient} onClick={onClick} style={{ opacity }}>
        {!!count && <Counter count={count} size="default" />}
        <img src={props.image} alt={props.name} className={styles.ingredient__img} ref={dragRef} />
        <div className={styles.ingredient__price}>
          <span className="text text_type_digits-default">{props.price}</span>
          <CurrencyIcon />
        </div>
        <span>{props.name}</span>
      </div>
    </>
  );
};

IngredientCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired
};
