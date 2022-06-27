import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patchUserThunk } from '../../../services/slices/user';
import { IUser, TAppDispatch, TRootState } from '../../../types';

type TFormState = {
  name: string;
  email: string;
  password: string;
  error?: null | string;
};

export const ProfileUserForm: FC = () => {
  const dispatch = useDispatch<TAppDispatch>();
  const user = useSelector((state: TRootState) => state.user);

  const [form, setForm] = useState<TFormState>({
    name: '',
    email: '',
    password: '******',
    error: null
  });

  useEffect(() => {
    setForm({
      name: user.name,
      email: user.email,
      password: '******',
      error: null
    });
  }, [user]);

  const [editedField, setEditedField] = useState<null | string>(null);

  const onIconClick = (field: 'password' | keyof IUser) => {
    if (editedField !== field) {
      setEditedField(field);
    }

    if (editedField === field) {
      dispatch(patchUserThunk({ name: field, value: form[field] }))
        .unwrap()
        .then(() => {
          setEditedField(null);

          if (field === 'password') {
            setForm({ ...form, password: '******' });
          }
        })
        .catch((error) => {
          setForm({
            ...form,
            error: error.message
          });
        });
    }
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form>
      <div className="mb-6">
        <Input
          name="name"
          type="text"
          placeholder="Имя"
          value={form.name}
          disabled={editedField !== 'name'}
          icon={editedField === 'name' ? 'CloseIcon' : 'EditIcon'}
          onIconClick={() => {
            onIconClick('name');
          }}
          onChange={onInputChange}
        />
      </div>
      <div className="mb-6">
        <Input
          name="email"
          type="text"
          placeholder="Логин"
          value={form.email}
          disabled={editedField !== 'email'}
          icon={editedField === 'email' ? 'CloseIcon' : 'EditIcon'}
          onIconClick={() => {
            onIconClick('email');
          }}
          onChange={onInputChange}
        />
      </div>
      <div className="mb-6">
        <Input
          name="password"
          type="text"
          placeholder="Пароль"
          value={form.password}
          disabled={editedField !== 'password'}
          icon={editedField === 'password' ? 'CloseIcon' : 'EditIcon'}
          onIconClick={() => {
            onIconClick('password');
          }}
          onChange={onInputChange}
        />
      </div>
    </form>
  );
};
