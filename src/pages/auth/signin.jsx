import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Error } from '../../components/error/error';
import { APP_ROUTES } from '../../constants';
import { signInThunk } from '../../services/slices/auth';
import { fetchUserThunk } from '../../services/slices/user';
import styles from './auth.module.css';

export const SignInPage = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: '',
    password: '',
    error: null
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setForm({
      ...form,
      error: null
    });

    dispatch(
      signInThunk({
        email: form.email,
        password: form.password
      })
    )
      .unwrap()
      .then(() => {
        dispatch(fetchUserThunk())
          .unwrap()
          .then(() => {
            history.replace(location.state?.from || APP_ROUTES.ORDER);
          });
      })
      .catch((error) => {
        setForm({
          ...form,
          password: '',
          error: error.message
        });
      });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className="text text_type_main-medium pb-6">Вход</h2>
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
      <div className={styles.input_container}>
        <PasswordInput name="password" value={form.password} onChange={onInputChange} />
      </div>
      {form.error && <Error>{form.error}</Error>}
      <div className={styles.button_container}>
        <Button type="primary" size="medium">
          Войти
        </Button>
      </div>
      <span className="text text_type_main-default text_color_inactive mb-4">
        Вы — новый пользователь?{' '}
        <Link
          to={{ pathname: APP_ROUTES.REGISTRATION, state: location.state }}
          state={location.state}
          className={styles.link}>
          Зарегистрироваться
        </Link>
      </span>
      <span className="text text_type_main-default text_color_inactive">
        Забыли пароль?{' '}
        <Link to={APP_ROUTES.FORGOT_PASSWORD} className={styles.link}>
          Восстановить пароль
        </Link>
      </span>
    </form>
  );
};
