import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export const ModalOverlay = ({ visible, onClick, children,  mountNode }) => {
    
    const className = `${styles.overlay} ${visible ? styles.overlay__flex : styles.overlay__none}`

    return (
        ReactDOM.createPortal(
            <div className={className} onClick={onClick}>
                <div className={styles.overlay__content}>
                    {children}
                </div>
            </div>,
            mountNode
        )
    )
}

ModalOverlay.defaultProps = {
    visible: false,
    mountNode: document.getElementById('root'),
}

ModalOverlay.propTypes = {
    visible: PropTypes.bool,
    onClick: PropTypes.func,
    mountNode: PropTypes.instanceOf(HTMLElement),
    children: PropTypes.node.isRequired
}

