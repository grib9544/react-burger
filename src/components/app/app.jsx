import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredientsThunk } from '../../services/slices/burger';
import { AppHeader } from '../app-header/header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';

export const App = () => {
  const ingredients = useSelector((state) => state.burger.ingredients);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchIngredientsThunk());
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {ingredients.loading && <div className="text text_type_main-large">Загрузка...</div>}
        {ingredients.error && <div className="text text_type_main-large">{ingredients.error}</div>}
        {!!ingredients.items.length && (
          <>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={styles.main__content}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </div>
          </>
        )}
      </main>
    </>
  );
};
