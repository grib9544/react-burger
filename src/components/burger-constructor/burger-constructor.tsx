import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../../constants';
import { createOrderThunk, setIngredient } from '../../services/slices/burger';
import { IComposeIngredient, TAppDispatch, TRootState } from '../../types';
import { Loader } from '../loader/loader';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import styles from './burger-constructor.module.css';
import { ConstructorItem } from './constructor-item/constructor-item';

export const BurgerConstructor: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch<TAppDispatch>();
  const { burger, user } = useSelector((state: TRootState) => state);

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
    drop({ _id }: IComposeIngredient) {
      dispatch(setIngredient({ _id }));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver()
    })
  });

  return (
    <>
      {visibility && !burger.order.loading && burger.order.orderId && (
        <Modal onClose={() => setVisibility(false)}>
          <OrderDetails orderId={burger.order.orderId} />
        </Modal>
      )}
      <section className={styles.bconstructor}>
        <div className={styles.bconstructor__list} ref={dropTarget}>
          {burger.composition.bun && (
            <ConstructorItem ingredient={burger.composition.bun} itemType="top" isLocked={true} />
          )}
          <div className={styles.bconstructor__scrollable}>
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
        <div className={styles.bconstructor__order}>
          <div className={styles.price}>
            <span className="text text_type_digits-medium">{burger.totalCost}</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="medium" onClick={onOrder} disabled={!burger.composition.bun}>
            {burger.order.loading ? <Loader /> : 'Оформить заказ'}
          </Button>
        </div>
      </section>
    </>
  );
};
