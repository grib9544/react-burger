import styles from './constructor-item.module.css'
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export const ConstructorItem = ({ type, isLocked, text, price, thumbnail}) => {
    return (
        <div className={styles.item}>
            { isLocked || (
                <div className={styles.item__icon}>
                    <DragIcon />
                </div> 
            )}
            <div className={styles.item__element}>
                <ConstructorElement
                    type={type}
                    isLocked={isLocked}
                    text={text}
                    price={price}
                    thumbnail={thumbnail}
                />
            </div>
        </div>
    )
}

ConstructorItem.defaultProps = {
    isLocked: false
}

ConstructorItem.propTypes = {
    type: PropTypes.oneOf(['top', 'bottom']),
    isLocked: PropTypes.bool,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired
}