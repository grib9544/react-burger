import PropTypes from 'prop-types';
import styles from './error.module.css';

export const Error = ({ children }) => {
  return <p className={`text text_type_main-default ${styles.error_text}`}>{children}</p>;
};

Error.propTypes = {
  children: PropTypes.node.isRequired
};
