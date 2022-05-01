import styles from './ingredient-card.module.css'
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useContext } from 'react';
import { IngredientDetails } from '../../ingredient-details/ingredient-details';
import { Modal } from '../../modal/modal';
import { ConstructorContext } from '../../../services/contexts/constructor';
import { randomAlphaNumeric } from '../../../utils'

export const IngredientCard = (props) => {
    const { constrState, constrDispatcher } = useContext(ConstructorContext)

    const [visibility, setVisibility] = React.useState(false)
    
    const onClick = () => {
        constrDispatcher({ type: 'SET_INGREDIENT', payload: {...props, constrId: randomAlphaNumeric()}})
        // setVisibility(true)
    }

    return (
        <>
            {visibility && (
                <Modal title="Детали ингредиента" setVisibility={setVisibility}>
                    <IngredientDetails {...props} />
                </Modal> )
            }
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
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
}