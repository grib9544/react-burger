import styles from './burger-constructor.module.css'
import { ConstructorItem } from './constructor-item/constructor-item'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { OrderDetails } from '../order-details/order-details'
import { Modal } from '../modal/modal'

export const BurgerConstructor = () => {

    const [visibility, setVisibility] = React.useState(false)

    const onOrder = () => {
        setVisibility(true)
    }

    return (
        <>  
            {visibility && (
                <Modal setVisibility={setVisibility}>
                    <OrderDetails />
                </Modal>
            )}
            <section className={styles.constructor}>
                <div className={styles.constructor__list}>
                    {/* mocked */}
                    <ConstructorItem
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    />
                    <div className={styles.constructor__scrollable}>
                        <ConstructorItem
                            text="Говяжий метеорит (отбивная)"
                            price={50}
                            thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
                        />
                    </div>
                    <ConstructorItem
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    />
                </div>
                <div className={styles.constructor__order}>
                    <div className={styles.price}>
                        <span className="text text_type_digits-medium">610</span>
                        <CurrencyIcon />
                    </div>
                    <Button type="primary" size="medium" onClick={onOrder}>
                        Оформить заказ
                    </Button>
                </div>
            </section>
        </>
    )
}