import React from 'react';
import styles from './burger-ingredients.module.css'
import { IngredientCard } from './ingredient-card/ingredient-card'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

export const BurgerIngredients = ({ ingredients }) => {
    const [current, setCurrent] = React.useState('bun')

    return (
        <section className={styles.ingredients}>
            <div className={styles.ingredients__tab}>
                <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
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
                    {ingredients.filter(ing => ing.type === 'bun').map(ing => (
                        <li key={ing._id}>
                            <IngredientCard  {...ing} />    
                        </li>
                    ))}
                </ul>
                <h2 className="text text_type_main-medium">
                    Соусы
                </h2>
                <ul className={styles.ingredients__list}>
                    {ingredients.filter(ing => ing.type === 'sauce').map(ing => (
                        <li key={ing._id}>
                            <IngredientCard  {...ing} />
                        </li>
                    ))}
                </ul>
                <h2 className="text text_type_main-medium">
                    Ингредиенты
                </h2>
                <ul className={styles.ingredients__list}>
                    {ingredients.filter(ing => ing.type === 'main').map(ing => (
                        <li key={ing._id}>
                            <IngredientCard {...ing} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
    }))
}