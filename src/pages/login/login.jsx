import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../constants';
import styles from './login.module.css';

export const LoginPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

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
    <form className={styles.login_form} onSubmit={onSubmit}>
      <h2 className="text text_type_main-medium pb-6">Вход</h2>
      <div className={styles.login_form__input_container}>
        <Input
          name="email"
          value={form.email}
          placeholder="E-mail"
          type="email"
          onChange={onInputChange}
        />
      </div>
      <div className={styles.login_form__input_container}>
        <PasswordInput name="password" value={form.password} onChange={onInputChange} />
      </div>
      <div className={styles.login_form__button_container}>
        <Button type="primary" size="medium">
          Войти
        </Button>
      </div>
      <span className="text text_type_main-default text_color_inactive mb-4">
        Вы — новый пользователь?{' '}
        <Link to={APP_ROUTES.REGISTRATION} className={styles.login_form__link}>
          Зарегистрироваться
        </Link>
      </span>
      <span className="text text_type_main-default text_color_inactive">
        Забыли пароль?{' '}
        <Link to={APP_ROUTES.FORGOT_PASSWORD} className={styles.login_form__link}>
          Восстановить пароль
        </Link>
      </span>
    </form>
  );
};
