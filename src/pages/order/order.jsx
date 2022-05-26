import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { fetchIngredientsThunk } from '../../services/slices/burger';
import styles from './order.module.css';

export const OrderPage = () => {
  const ingredients = useSelector((state) => state.burger.ingredients);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchIngredientsThunk());
  }, []);

  return (
    <>
      {ingredients.loading && <div className="text text_type_main-large">Загрузка...</div>}
      {ingredients.error && <div className="text text_type_main-large">{ingredients.error}</div>}
      {!!ingredients.items.length && (
        <>
          <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
          <div className={styles.content}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </div>
        </>
      )}
    </>
  );
};
