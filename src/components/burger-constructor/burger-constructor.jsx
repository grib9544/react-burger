import styles from './burger-constructor.module.css'
import { ConstructorItem } from './constructor-item/constructor-item'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useContext } from 'react'
import { OrderDetails } from '../order-details/order-details'
import { Modal } from '../modal/modal'
import { ConstructorContext } from '../../services/contexts/constructor';
import { createOrder } from '../../services/api';
import { FetchError } from '../../error';

export const BurgerConstructor = () => {
    const { constrState, constrDispatcher } = useContext(ConstructorContext)

    const [visibility, setVisibility] = React.useState(false)

    const onOrder = () => {
        const makeOrder = async () => {
            try {
                const { orderId } = await createOrder(constrState.burger.map(ing => ing._id));

                constrDispatcher({ type: 'SET_ORDER', payload: orderId });
                setVisibility(true)
            } catch (error) {
                if (error instanceof FetchError) {
                    console.error(error.message)
                    return;
                }

                console.error(error)
            }
        }
        makeOrder();
    }

    return (
        <>  
            {visibility && (
                <Modal setVisibility={setVisibility}>
                    <OrderDetails orderId={constrState.order} />
                </Modal>
            )}
            <section className={styles.constructor}>
                <div className={styles.constructor__list}>
                    {constrState.burger.filter(ing => ing.type === 'bun').map(ing => (
                        <ConstructorItem
                            {...ing}
                            type="top"
                            isLocked={true}
                        />
                    ))}
                    <div className={styles.constructor__scrollable}>
                        {constrState.burger.filter(ing => ing.type !== 'bun').map(ing => (
                            <ConstructorItem key={ing.constrId} {...ing} />
                        ))}
                    </div>
                    {constrState.burger.filter(ing => ing.type === 'bun').map(ing => (
                        <ConstructorItem
                            {...ing}
                            type="bottom"
                            isLocked={true}
                        />
                    ))}
                </div>
                <div className={styles.constructor__order}>
                    <div className={styles.price}>
                        <span className="text text_type_digits-medium">
                            {constrState.totalCost}
                        </span>
                        <CurrencyIcon />
                    </div>
                    <Button 
                        type="primary" 
                        size="medium" 
                        onClick={onOrder} 
                        disabled={!constrState.burger.length}
                    >
                        Оформить заказ
                    </Button>
                </div>
            </section>
        </>
    )
}