import styles from './burger-constructor.module.css'
import { ConstructorItem } from './constructor-item/constructor-item'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { OrderDetails } from '../order-details/order-details'
import { Modal } from '../modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { createOrderThunk } from '../../services/slices/burger'

export const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { composition, totalCost, order } = useSelector(state => state.burger)

    const [visibility, setVisibility] = React.useState(false)

    const onOrder = () => {
        dispatch(createOrderThunk());
        setVisibility(true)
    }

    return (
        <>  
            {visibility && !order.loading && (
                <Modal setVisibility={setVisibility}>
                    <OrderDetails orderId={order.orderId} />
                </Modal>
            )}
            <section className={styles.constructor}>
                <div className={styles.constructor__list}>
                    {composition.bun && 
                        <ConstructorItem
                            {...composition.bun}
                            itemType="top"
                            isLocked={true}
                        />
                    }
                    <div className={styles.constructor__scrollable}>
                        {composition.filling.map(ing => (
                            <ConstructorItem key={ing.composId} {...ing} />
                        ))}
                    </div>
                    {composition.bun && 
                        <ConstructorItem
                            {...composition.bun}
                            itemType="bottom"
                            isLocked={true}
                        />
                    }
                </div>
                <div className={styles.constructor__order}>
                    <div className={styles.price}>
                        <span className="text text_type_digits-medium">
                            {totalCost}
                        </span>
                        <CurrencyIcon />
                    </div>
                    <Button 
                        type="primary" 
                        size="medium" 
                        onClick={onOrder} 
                        disabled={!composition.bun}
                    >
                        Оформить заказ
                    </Button>
                </div>
            </section>
        </>
    )
}