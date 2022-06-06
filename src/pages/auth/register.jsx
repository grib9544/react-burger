import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Error } from '../../components/error/error';
import { APP_ROUTES } from '../../constants';
import { signUpThunk } from '../../services/slices/auth';
import { fetchUserThunk } from '../../services/slices/user';
import styles from './auth.module.css';

export const RegisterPage = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
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

  const onSubmit = (event) => {
    event.preventDefault();

    setForm({
      ...form,
      error: null
    });

    dispatch(
      signUpThunk({
        email: form.email,
        password: form.password,
        name: form.name
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
          error: error.message
        });
      });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className="text text_type_main-medium pb-6">Регистрация</h2>
      <div className={styles.input_container}>
        <Input
          name="name"
          value={form.name}
          placeholder="Имя"
          type="text"
          onChange={onInputChange}
        />
      </div>
      <div className={styles.input_container}>
        <Input
          name="email"
          value={form.email}
          placeholder="E-mail"
          type="email"
          onChange={onInputChange}
        />
      </div>
      <div className={styles.input_container}>
        <PasswordInput name="password" value={form.password} onChange={onInputChange} />
      </div>
      {form.error && <Error>{form.error}</Error>}
      <div className={styles.button_container}>
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </div>
      <span className="text text_type_main-default text_color_inactive mb-4">
        Уже зарегестрированы?{' '}
        <Link to={APP_ROUTES.LOGIN} className={styles.link}>
          Войти
        </Link>
      </span>
    </form>
  );
};
