import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { OrderItem } from '../../../components/order-item/order-item';
import { connectStart, connectStop } from '../../../services/slices/profile-orders';
import { TAppDispatch, TRootState } from '../../../types';
import styles from './orders.module.css';

export const ProfileOrders: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<TAppDispatch>();
  const { orders } = useSelector((state: TRootState) => state.pOrders);

  useEffect(() => {
    dispatch(connectStart());
    return () => {
      dispatch(connectStop());
    };
  }, []);

  return (
    <ul className={styles.order_list}>
      {orders.map((o) => {
        return (
          <Link
            key={o._id}
            to={{
              pathname: `/profile/orders/${o._id}`,
              state: { background: location }
            }}>
            <OrderItem order={o} showStatus />
          </Link>
        );
      })}
    </ul>
  );
};
