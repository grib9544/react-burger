import styles from './ingredient-card.module.css'
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export const IngredientCard = ({ img, price, title}) => {
    return (
        <div className={styles.ingredient}>
            <img src={img} alt={title} className={styles.ingredient__img} />
            <div className={styles.ingredient__price}>
                <span className='text text_type_digits-default'>
                    {price}
                </span>	
                <CurrencyIcon />
            </div>
            <span>{title}</span>
        </div>
    )
}

IngredientCard.propTypes = {
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
}