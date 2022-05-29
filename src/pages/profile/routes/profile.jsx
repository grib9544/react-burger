import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patchUserThunk } from '../../../services/slices/user';

export const ProfileUserForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [form, setForm] = useState({});

  useEffect(() => {
    setForm({
      name: user.name,
      email: user.email
    });
  }, [user]);

  const [editedField, setEditedField] = useState(null);

  const onIconClick = (field) => {
    if (editedField !== field) {
      setEditedField(field);
    }

    if (editedField === field) {
      console.log(field, form[field]);
      dispatch(patchUserThunk({ name: field, value: form[field] }))
        .unwrap()
        .then(() => {
          setEditedField(null);
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
        {/* <Input
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
        /> */}
      </div>
      {/* <div className="mb-6">
        <Input name="email" type="email" placeholder="E-mail" />
      </div>
      <div className="mb-6">
        <Input name="password" type="password" placeholder="Пароль" />
      </div> */}
    </form>
  );
};
