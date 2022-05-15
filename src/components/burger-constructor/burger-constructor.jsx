import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { createOrderThunk, setIngredient } from '../../services/slices/burger';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import styles from './burger-constructor.module.css';
import { ConstructorItem } from './constructor-item/constructor-item';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { composition, totalCost, order } = useSelector((state) => state.burger);

  const [visibility, setVisibility] = React.useState(false);

  const onClose = () => {
    setVisibility(false);
  };

  const onOrder = () => {
    dispatch(createOrderThunk());
    setVisibility(true);
  };

  const [, dropTarget] = useDrop({
    accept: 'composition',
    drop({ _id }) {
      dispatch(setIngredient({ _id }));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver()
    })
  });

  return (
    <>
      {visibility && !order.loading && (
        <Modal onClose={onClose}>
          <OrderDetails orderId={order.orderId} />
        </Modal>
      )}
      <section className={styles.constructor}>
        <div className={styles.constructor__list} ref={dropTarget}>
          {composition.bun && (
            <ConstructorItem ingredient={composition.bun} itemType="top" isLocked={true} />
          )}
          <div className={styles.constructor__scrollable}>
            {composition.filling.map((ing) => (
              <ConstructorItem key={ing.composId} ingredient={ing} />
            ))}
          </div>
          {composition.bun && (
            <ConstructorItem ingredient={composition.bun} itemType="bottom" isLocked={true} />
          )}
        </div>
        <div className={styles.constructor__order}>
          <div className={styles.price}>
            <span className="text text_type_digits-medium">{totalCost}</span>
            <CurrencyIcon />
          </div>
          <Button type="primary" size="medium" onClick={onOrder} disabled={!composition.bun}>
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
};
