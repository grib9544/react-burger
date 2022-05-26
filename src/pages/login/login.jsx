import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './login.module.css';

export const LoginPage = () => {
  return (
    <form className={styles.login_form}>
      <p className="text text_type_main-medium pb-6">Вход</p>
      <div className={styles.login_form__input_container}>
        <Input name="email" value="" placeholder="E-mail" type="email" />
      </div>
      <div className={styles.login_form__input_container}>
        <PasswordInput name="password" value="" />
      </div>
      <Button className="pb-20" disabled type="primary" size="medium">
        Войти
      </Button>
    </form>
  );
};
