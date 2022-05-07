import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { useKeyPress } from '../../hooks';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

export const Modal = ({ title, setVisibility, children, mountNode }) => {
  const onEscPress = useKeyPress('Escape');

  React.useEffect(() => {
    if (onEscPress) {
      setVisibility(false);
    }
  });

  const onClose = () => {
    setVisibility(false);
  };

  const onClick = (event) => {
    event.currentTarget === event.target && setVisibility(false);
  };

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClick}>
      <div className={styles.modal}>
        <div className={styles.modal__header}>
          <p className="text text_type_main-large">{title}</p>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        <div className={styles.modal__content}>{children}</div>
      </div>
    </ModalOverlay>,
    mountNode
  );
};

Modal.defaultProps = {
  mountNode: document.getElementById('modals')
};

Modal.propTypes = {
  title: PropTypes.string,
  setVisibility: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  mountNode: PropTypes.instanceOf(HTMLElement)
};
