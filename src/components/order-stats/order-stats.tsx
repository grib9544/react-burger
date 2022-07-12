import { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { TRootState } from '../../types';
import styles from './order-stats.module.css';

export const OrderStats: FC = () => {
  const { orders, total, totalToday } = useSelector((state: TRootState) => state.orders);

  const doneOrdersIds = useCallback(() => {
    const doneOrders = orders.filter((order) => order.status === 'done');

    return doneOrders.slice(0, 5).map((order) => {
      return (
        <li className="text text_type_digits-default" key={order._id}>
          {`0${order.number}`}
        </li>
      );
    });
  }, [orders]);

  const inProgressOrdersIds = useCallback(() => {
    const doneOrders = orders.filter((order) => order.status === 'pending');

    return doneOrders.slice(0, 5).map((order) => {
      return (
        <li className="text text_type_digits-default" key={order._id}>
          {`0${order.number}`}
        </li>
      );
    });
  }, [orders]);

  return (
    <div className={styles.order_stats}>
      <div className={styles.order_stats__orders}>
        <div className={styles.order_board}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <ul className={styles.order_board__list__done}>{doneOrdersIds()}</ul>
        </div>
        <div className={styles.order_board__list__in_progress}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <ul className={styles.order_board__list}>{inProgressOrdersIds()}</ul>
        </div>
      </div>
      <p className="text text_type_main-medium">Выполнено за всё время:</p>
      <p className="text text_type_digits-large mb-8">{total}</p>
      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <p className="text text_type_digits-large mb-8">{totalToday}</p>
    </div>
  );
};
