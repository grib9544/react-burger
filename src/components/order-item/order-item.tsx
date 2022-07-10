import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import moment from 'moment';
import 'moment/locale/ru';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { IOrder, TRootState } from '../../types';
import styles from './order-item.module.css';

type TOrderItemProps = {
  order: IOrder;
  showStatus?: boolean;
};

export const OrderItem: FC<TOrderItemProps> = ({ order, showStatus = false }) => {
  const { items } = useSelector((state: TRootState) => state.burger.ingredients);

  const ingredients = useMemo(() => {
    const ingrs = [];

    for (const i of order.ingredients) {
      const result = items.find((item) => i === item._id);
      if (result) {
        ingrs.push(result);
      }
    }

    return ingrs;
  }, [order.ingredients, items]);

  const cost = useMemo(() => {
    return ingredients.reduce((pv, curr) => pv + curr.price, 0);
  }, [ingredients]);

  const [status, setStatus] = useState<string>('');
  const [statusColor, setStatusColor] = useState<string>('white');

  useEffect(() => {
    switch (order?.status) {
      case 'created':
        setStatus('Создан');
        break;

      case 'pending':
        setStatus('Готовится');
        break;

      case 'done':
        setStatus('Выполнен');
        setStatusColor('#00cccc');
        break;

      default:
        break;
    }
  }, [order?.status]);

  const iconList = useCallback(() => {
    return ingredients.slice(0, 5).map((i, index) => {
      return (
        <li key={index}>
          <span className={styles.ingredient_icon_wrapper} style={{ zIndex: 10 - index }}>
            <img
              src={i.image_mobile}
              alt={i.name}
              title={i.name}
              width="112px"
              className={styles.ingredient_icon}
            />
          </span>
        </li>
      );
    });
  }, [ingredients]);

  return (
    <li className={styles.order_item}>
      <div className={styles.order_item__content}>
        <div className={styles.order_item__header}>
          <p className="text text_type_digits-default">{`#0${order.number}`}</p>
          <p className="text text_type_main-default text_color_inactive">
            {moment(`${order.createdAt}`).locale('ru').calendar()}
          </p>
        </div>
        <p className="text text_type_main-medium mb-6">{order.name}</p>
        {showStatus && (
          <p className="text text_type_main-default mb-6" style={{ color: statusColor }}>
            {status}
          </p>
        )}
        <div className={styles.order_item__ingredients}>
          <ul className={styles.ingredients_list}>{iconList()}</ul>
          <div className={styles.order_price}>
            <span className="text text_type_digits-default">{cost}</span>
            <CurrencyIcon type={'primary'} />
          </div>
        </div>
      </div>
    </li>
  );
};
