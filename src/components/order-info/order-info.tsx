import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import moment from 'moment';
import 'moment/locale/ru';
import { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { connectStart, connectStop } from '../../services/slices/orders';
import { TAppDispatch, TRootState } from '../../types';
import styles from './order-info.module.css';

type TRouteParams = {
  id: string;
};

export const OrderInfo: FC = () => {
  const { id } = useParams<TRouteParams>();
  const dispatch = useDispatch<TAppDispatch>();

  useEffect(() => {
    dispatch(connectStart());
    return () => {
      dispatch(connectStop());
    };
  }, []);

  const { items } = useSelector((state: TRootState) => state.burger.ingredients);

  const order = useSelector((state: TRootState) =>
    state.orders.orders.find((ing) => ing._id === id)
  );

  const ingredients = useMemo(() => {
    const ingrs = [];

    if (!order) {
      return;
    }

    for (const i of order.ingredients) {
      const result = items.find((item) => i === item._id);

      if (result) {
        ingrs.push(result);
      }
    }

    const ingrsWithCount = [];
    const usedIds: string[] = [];

    for (const ingr of ingrs) {
      if (usedIds.includes(ingr._id)) {
        continue;
      }

      const count = ingrs.filter((i) => i._id === ingr._id);

      usedIds.push(ingr._id);

      ingrsWithCount.push({
        ...ingr,
        count: count.length
      });
    }

    return ingrsWithCount;
  }, [order, items]);

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

  const cost = useMemo(() => {
    return ingredients?.reduce((pv, curr) => pv + curr.price, 0);
  }, [ingredients]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.order_info}>
      <p className="text text_type_digits-default mb-10">{`#0${order?.number.toString()}`}</p>
      <p className="text text_type_main-medium mb-3">{order?.name}</p>
      <p className="text text_type_main-default mb-15" style={{ color: statusColor }}>
        {status}
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={styles.order_info__scroll}>
        <ul className={styles.ingredients__list}>
          {ingredients?.map((i, index) => {
            return (
              <li key={index} className={styles.ingredient_item}>
                <span className={styles.ingredient__item__icon_wrapper}>
                  <img
                    src={i.image_mobile}
                    alt={i.name}
                    title={i.name}
                    width="112px"
                    className={styles.ingredient_item__icon}
                  />
                </span>
                <p className="text text_type_main-defaukt">{i.name}</p>
                <div className={styles.order_price}>
                  <span className="text text_type_digits-default">{`${i.count} x ${i.price}`}</span>
                  <CurrencyIcon type={'primary'} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.order_info__footer}>
        <p className="text text_type_main-default text_color_inactive">
          {moment(`${order?.createdAt}`).locale('ru').calendar()}
        </p>
        <div className={styles.order_price}>
          <span className="text text_type_digits-default">{cost}</span>
          <CurrencyIcon type={'primary'} />
        </div>
      </div>
    </div>
  );
};
