import { FC, ReactNode, SyntheticEvent } from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClick: (event: SyntheticEvent) => void;
  children: ReactNode;
};

export const ModalOverlay: FC<TModalOverlayProps> = ({ onClick, children }) => {
  return (
    <div className={`${styles.overlay} ${styles.overlay__flex}`} onClick={onClick}>
      <div className={styles.overlay__content}>{children}</div>
    </div>
  );
};
