import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../../constants';
import { createOrderThunk, setIngredient } from '../../services/slices/burger';
import { Loader } from '../loader/loader';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import styles from './burger-constructor.module.css';
import { ConstructorItem } from './constructor-item/constructor-item';

export const BurgerConstructor = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { burger, user } = useSelector((state) => state);

  const [visibility, setVisibility] = React.useState(false);

  const onOrder = () => {
    if (user.email) {
      setVisibility(true);
      dispatch(createOrderThunk());
    } else {
      history.push({ pathname: APP_ROUTES.LOGIN, state: { from: location.pathname } });
    }
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
      {visibility && !burger.order.loading && (
        <Modal onClose={() => setVisibility(false)}>
          <OrderDetails orderId={burger.order.orderId} />
        </Modal>
      )}
      <section className={styles.constructor}>
        <div className={styles.constructor__list} ref={dropTarget}>
          {burger.composition.bun && (
            <ConstructorItem ingredient={burger.composition.bun} itemType="top" isLocked={true} />
          )}
          <div className={styles.constructor__scrollable}>
            {burger.composition.filling.map((ing) => (
              <ConstructorItem key={ing.composId} ingredient={ing} />
            ))}
          </div>
          {burger.composition.bun && (
            <ConstructorItem
              ingredient={burger.composition.bun}
              itemType="bottom"
              isLocked={true}
            />
          )}
        </div>
        <div className={styles.constructor__order}>
          <div className={styles.price}>
            <span className="text text_type_digits-medium">{burger.totalCost}</span>
            <CurrencyIcon />
          </div>
          <Button type="primary" size="medium" onClick={onOrder} disabled={!burger.composition.bun}>
            {burger.order.loading ? <Loader /> : 'Оформить заказ'}
          </Button>
        </div>
      </section>
    </>
  );
};
