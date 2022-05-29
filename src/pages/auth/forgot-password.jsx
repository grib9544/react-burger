import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Error } from '../../components/error/error';
import { APP_ROUTES } from '../../constants';
import { forgotPasswordThunk } from '../../services/slices/auth';
import styles from './auth.module.css';

export const ForgotPasswordPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: '', error: null });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(forgotPasswordThunk(form.email))
      .unwrap()
      .then(() => {
        history.push(APP_ROUTES.RESET_PASSWORD);
      })
      .catch((error) => {
        setForm({
          ...form,
          error: error.message
        });
      });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>
      <div className={styles.input_container}>
        <Input
          name="email"
          value={form.email}
          placeholder="E-mail"
          type="email"
          error={!!form.error}
          onChange={onInputChange}
        />
      </div>
      {form.error && <Error>{form.error}</Error>}
      <div className={styles.button_container}>
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </div>
      <span className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?{' '}
        <Link to={APP_ROUTES.LOGIN} className={styles.link}>
          Войти
        </Link>
      </span>
    </form>
  );
};
