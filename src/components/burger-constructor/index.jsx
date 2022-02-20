import styles from './burger-constructor.module.css'
import { ConstructorItem } from './constructor-item'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export const BurgerConstructor = () => {
    return (
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
                    <ConstructorItem
                        text="Говяжий метеорит (отбивная)"
                        price={50}
                        thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
                    />
                     <ConstructorItem
                        text="Говяжий метеорит (отбивная)"
                        price={50}
                        thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
                    />
                     <ConstructorItem
                        text="Говяжий метеорит (отбивная)"
                        price={50}
                        thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
                    />
                     <ConstructorItem
                        text="Говяжий метеорит (отбивная)"
                        price={50}
                        thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
                    />
                     <ConstructorItem
                        text="Говяжий метеорит (отбивная)"
                        price={50}
                        thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
                    />
                     <ConstructorItem
                        text="Говяжий метеорит (отбивная)"
                        price={50}
                        thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
                    />
                     <ConstructorItem
                        text="Говяжий метеорит (отбивная)"
                        price={50}
                        thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
                    />
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
                <Button type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}