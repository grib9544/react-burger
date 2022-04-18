import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';
import { useKeyPress } from '../../hooks';
import PropTypes from 'prop-types';

export const ModalOverlay = ({ children,  mountNode }) => {
    const onEscPress = useKeyPress('Escape')

    const [isVisible, setVisability] = React.useState(true)

    useEffect(() => {
        if (onEscPress) {
            setVisability(false)
        }
    }, [onEscPress])
    

    const onClick = (event) => {
        event.currentTarget === event.target && setVisability(false)
    }
    
    const className = `${styles.overlay} ${isVisible ? styles.overlay__flex : styles.overlay__none}`

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
    mountNode: document.getElementById('root'),
}

ModalOverlay.propTypes = {
    mountNode: PropTypes.instanceOf(HTMLElement),
    children: PropTypes.node.isRequired
}

