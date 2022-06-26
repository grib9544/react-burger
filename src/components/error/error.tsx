import { FC, ReactNode } from 'react';
import styles from './error.module.css';

type TErrorProps = {
  children: ReactNode;
};

export const Error: FC<TErrorProps> = ({ children }) => {
  return <p className={`text text_type_main-default ${styles.error_text}`}>{children}</p>;
};
