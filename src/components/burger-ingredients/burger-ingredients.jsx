import React from 'react';
import styles from './burger-ingredients.module.css'
import { IngredientCard } from './ingredient-card/ingredient-card'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import data from '../../utils/data.json'

export const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('bun')

    return (
        <section className={styles.ingredients}>
            <div className={styles.ingredients__tab}>
                <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="souse" active={current === "souse"} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === "main"} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            {/* 
                TODO: to separate component
             */}
            <div className={styles.scrollable_content}>
                <h2 className="text text_type_main-medium">
                    Булки
                </h2>
                <ul className={styles.ingredients__list}>
                    {data.filter(ing => ing.type === 'bun').map(ing => (
                        <li key={ing._id}>
                            <IngredientCard  
                                img={ing.image} 
                                price={ing.price} 
                                title={ing.name} 
                            />
                        </li>
                    ))}
                </ul>
                <h2 className="text text_type_main-medium">
                    Соусы
                </h2>
                <ul className={styles.ingredients__list}>
                    {data.filter(ing => ing.type === 'sauce').map(ing => (
                        <li key={ing._id}>
                            <IngredientCard  
                                img={ing.image} 
                                price={ing.price} 
                                title={ing.name} 
                            />
                        </li>
                    ))}
                </ul>
                <h2 className="text text_type_main-medium">
                    Ингредиенты
                </h2>
                <ul className={styles.ingredients__list}>
                    {data.filter(ing => ing.type === 'main').map(ing => (
                        <li key={ing._id}>
                            <IngredientCard 
                                img={ing.image} 
                                price={ing.price} 
                                title={ing.name} 
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}