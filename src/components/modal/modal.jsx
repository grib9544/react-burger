import styles from './modal.module.css';
import PropTypes from 'prop-types';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const Modal = ({ title,  children }) => {
    return (
        <ModalOverlay>
            <div className={styles.modal}>
                <header className={styles.modal__header}>
                    <p className="text text_type_main-large">{title}</p>
                    <CloseIcon type="primary" />
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

