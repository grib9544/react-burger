import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ onClick, children }) => {
  return (
    <div className={`${styles.overlay} ${styles.overlay__flex}`} onClick={onClick}>
      <div className={styles.overlay__content}>{children}</div>
    </div>
  );
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};
