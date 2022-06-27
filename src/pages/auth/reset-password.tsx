import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Error } from '../../components/error/error';
import { APP_ROUTES } from '../../constants';
import { resetPasswordThunk } from '../../services/slices/auth';
import { TAppDispatch, TLocation } from '../../types';
import styles from './auth.module.css';

export const ResetPasswordPage: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch<TAppDispatch>();
  const location = useLocation<TLocation>();

  const [form, setForm] = useState({ password: '', token: '', error: null });

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    dispatch(
      resetPasswordThunk({
        password: form.password,
        token: form.token
      })
    )
      .unwrap()
      .then(() => {
        history.replace(APP_ROUTES.LOGIN);
      })
      .catch((error) => {
        setForm({
          ...form,
          error: error.message
        });
      });
  };

  if (!location.state?.fromForgot) {
    history.replace(APP_ROUTES.FORGOT_PASSWORD);
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>
      <div className={styles.input_container}>
        <PasswordInput
          name="password"
          value={form.password}
          /*
          // @ts-ignore lib error */
          placeholder="Введите новый пароль"
          type="email"
          onChange={onInputChange}
        />
      </div>
      <div className={styles.input_container}>
        <Input
          name="token"
          value={form.token}
          placeholder="Введите код из письма"
          error={!!form.error}
          onChange={onInputChange}
        />
      </div>
      {form.error && <Error>{form.error}</Error>}
      <div className={styles.button_container}>
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </div>
      <span className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?{' '}
        <Link to={APP_ROUTES.LOGIN} className={styles.link} replace>
          Войти
        </Link>
      </span>
    </form>
  );
};
