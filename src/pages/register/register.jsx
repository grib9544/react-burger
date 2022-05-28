import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../constants';
import styles from './register.module.css';

export const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
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
    <form className={styles.register_form} onSubmit={onSubmit}>
      <h2 className="text text_type_main-medium pb-6">Регистрация</h2>
      <div className={styles.register_form__input_container}>
        <Input
          name="name"
          value={form.name}
          placeholder="Имя"
          type="text"
          onChange={onInputChange}
        />
      </div>
      <div className={styles.register_form__input_container}>
        <Input
          name="email"
          value={form.email}
          placeholder="E-mail"
          type="email"
          onChange={onInputChange}
        />
      </div>
      <div className={styles.register_form__input_container}>
        <PasswordInput name="password" value={form.password} onChange={onInputChange} />
      </div>
      <div className={styles.register_form__button_container}>
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </div>
      <span className="text text_type_main-default text_color_inactive mb-4">
        Уже зарегестрированы?{' '}
        <Link to={APP_ROUTES.LOGIN} className={styles.register_form__link}>
          Войти
        </Link>
      </span>
    </form>
  );
};
