import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { OrderItem } from '../../components/order-item/order-item';
import { OrderStats } from '../../components/order-stats/order-stats';
import { TRootState } from '../../types';
import styles from './order-feed.module.css';

export const OrderFeed: FC = () => {
  const location = useLocation();
  const { orders } = useSelector((state: TRootState) => state.orders);

  return (
    <>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <div className={styles.order_feed}>
        <ul className={styles.order_list}>
          {orders.map((o) => {
            return (
              <Link
                key={o._id}
                to={{
                  pathname: `/feed/${o._id}`,
                  state: { background: location }
                }}>
                <OrderItem order={o} />
              </Link>
            );
          })}
        </ul>
        <OrderStats />
      </div>
    </>
  );
};
