import React from 'react';
import styles from './modal.module.css';
import PropTypes from 'prop-types';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useKeyPress } from '../../hooks';

export const Modal = ({ title,  children }) => {
    const onEscPress = useKeyPress('Escape')

    const [visible, setVisibility] = React.useState(true)

    React.useEffect(() => {
        if (onEscPress) {
            setVisibility(false)
        }
    }, [onEscPress])

    const onClose = () => {
        setVisibility(false)
    }

    const onClick = (event) => {
        event.currentTarget === event.target && setVisibility(false)
    }

    return (
        <ModalOverlay visible={visible} onClick={onClick}>
            <div className={styles.modal}>
                <header className={styles.modal__header}>
                    <p className="text text_type_main-large">{title}</p>
                    <CloseIcon type="primary" onClick={onClose} />
                </header>
                <div className={styles.modal__content}>
                    {children}
                </div>
            </div>
        </ModalOverlay>
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired
}

