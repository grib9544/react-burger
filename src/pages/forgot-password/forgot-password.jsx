import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../constants';
import styles from './forgot-password.module.css';

export const ForgotPasswordPage = () => {
  const [form, setForm] = useState({ email: '' });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(form);
  };

  return (
    <form className={styles.forgot_pass_form} onSubmit={onSubmit}>
      <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>
      <div className={styles.forgot_pass_form__input_container}>
        <Input
          name="email"
          value={form.email}
          placeholder="E-mail"
          type="email"
          onChange={onInputChange}
        />
      </div>
      <div className={styles.forgot_pass_form__button_container}>
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </div>
      <span className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?{' '}
        <Link to={APP_ROUTES.LOGIN} className={styles.forgot_pass_form__link}>
          Войти
        </Link>
      </span>
    </form>
  );
};
