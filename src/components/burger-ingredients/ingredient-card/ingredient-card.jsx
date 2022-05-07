import styles from './ingredient-card.module.css'
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useEffect } from 'react';
import { IngredientDetails } from '../../ingredient-details/ingredient-details';
import { Modal } from '../../modal/modal';
import { randomAlphaNumeric } from '../../../utils'
import { useDoubleClick } from '../../../hooks/doubleClick';
import { useDispatch, useSelector } from 'react-redux'
import { setIngredient } from '../../../services/slices/burger';

export const IngredientCard = (props) => {
    const { composition } = useSelector(state => state.burger)
    const dispatch = useDispatch()

    const [count, setCount] = useState(0)
    const [visibility, setVisibility] = useState(false)

    useEffect(() => {
        if (props.type === 'bun' && composition.bun?._id === props._id) {
            setCount(2)
            return
        }

        const fillingCount = composition.filling.filter(ing => ing._id === props._id).length
        setCount(fillingCount)
    }, [composition, props._id, props.type])
    
    const onClick = useDoubleClick(
        () => dispatch(setIngredient({ ...props, composId: randomAlphaNumeric() })),
        () => setVisibility(true),
    );

    return (
        <>
            {visibility && (
                <Modal title="Детали ингредиента" setVisibility={setVisibility}>
                    <IngredientDetails {...props} />
                </Modal> )
            }
            <div className={styles.ingredient} onClick={onClick}>
                {!!count && <Counter count={count} size="default" />}
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