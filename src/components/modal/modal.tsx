import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, ReactNode, SyntheticEvent, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useKeyPress } from '../../hooks';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

type TModalProps = {
  title?: string;
  children: ReactNode;
  onClose: () => void;
  mountNode?: HTMLElement;
};

export const Modal: FC<TModalProps> = ({
  title,
  children,
  onClose,
  mountNode = document.getElementById('modals') as HTMLElement
}) => {
  const onModalClose = () => {
    onClose();
  };

  const onEscPress = useKeyPress('Escape');

  useEffect(() => {
    if (onEscPress) {
      onModalClose();
    }
  });

  const onClick = (event: SyntheticEvent) => {
    event.currentTarget === event.target && onModalClose();
  };

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClick}>
      <div className={styles.modal}>
        <div className={styles.modal__header}>
          <p className="text text_type_main-large">{title}</p>
          <CloseIcon type="primary" onClick={onModalClose} />
        </div>
        <div className={styles.modal__content}>{children}</div>
      </div>
    </ModalOverlay>,
    mountNode
  );
};
