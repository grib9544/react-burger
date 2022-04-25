import styles from './ingredient-card.module.css'
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import { IngredientDetails } from '../../ingredient-details/ingredient-details';

export const IngredientCard = (props) => {
    const [visibility, setVisibility] = React.useState(false)
    
    const onClick = () => {
        setVisibility(true)
    }

    return (
        <>
            { visibility && <IngredientDetails {...props} setVisibility={setVisibility} /> }
            <div className={styles.ingredient} onClick={onClick}>
                <img src={props.image} alt={props.name} className={styles.ingredient__img} />
                <div className={styles.ingredient__price}>
                    <span className='text text_type_digits-default'>
                        {props.price}
                    </span>	
                    <CurrencyIcon />
                </div>
                <span>{props.name}</span>
            </div>
        </>
    )
}

IngredientCard.propTypes = {
    name: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
}