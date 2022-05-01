import styles from './constructor-item.module.css'
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ConstructorContext } from '../../../services/contexts/constructor';
import { useContext } from 'react';

export const ConstructorItem = (props) => {
    const { constrDispatcher } = useContext(ConstructorContext)

    const { type, isLocked, name, price, image} = props

    const handleClose = () => {
        constrDispatcher({ type: 'REMOVE_INGREDIENT', payload: {...props} })
    }

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
                    text={name}
                    price={price}
                    thumbnail={image}
                    handleClose={handleClose}
                />
            </div>
        </div>
    )
}

ConstructorItem.defaultProps = {
    isLocked: false
}

ConstructorItem.propTypes = {
    _id: PropTypes.string.isRequired,
    constrId: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['top', 'bottom']),
    isLocked: PropTypes.bool,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
}