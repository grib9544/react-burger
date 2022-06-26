import { FC } from 'react';
import doneSvg from '../../assets/done.svg';
import styles from './order-details.module.css';

type TOrderDetailsProps = {
  orderId: number;
};

export const OrderDetails: FC<TOrderDetailsProps> = ({ orderId }) => {
  return (
    <>
      <p className={`${styles.order_id__shadow} text text_type_digits-large pb-8`}>{orderId}</p>
      <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
      <img className="pb-15" src={doneSvg} alt="Заказ принят"></img>
      <p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive pb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};
