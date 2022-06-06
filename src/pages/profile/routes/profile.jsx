import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patchUserThunk } from '../../../services/slices/user';

export const ProfileUserForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '******'
  });

  useEffect(() => {
    setForm({
      name: user.name,
      email: user.email,
      password: '******'
    });
  }, [user]);

  const [editedField, setEditedField] = useState(null);

  const onIconClick = (field) => {
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

  const onInputChange = (event) => {
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
