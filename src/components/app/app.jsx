
import React from 'react';
import { AppHeader } from '../app-header/header'
import styles from './app.module.css'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from '../modal/modal';
import { fetchIngredients } from '../../service';


export const App = () => {
  const [state, setState] = React.useState({
    ingredients: [],
  });

  React.useEffect(() => {
    const getIngredients = async () => {
      const ingredients = await fetchIngredients();

      setState({
        ingredients: ingredients,
      });
    }

    getIngredients();
  }, [])

  return (
    <>
      <Modal title="Детали Ингридиента">
        <div>
          <h1>Контент</h1>
        </div>
      </Modal>
      <AppHeader />
      <main className={styles.main}>
        	<h1 className="text text_type_main-large mb-5">
          		Соберите бургер
       		</h1>
        	<div className={styles.main__content}>
				      <BurgerIngredients ingredients={state.ingredients} />
          		<BurgerConstructor />
        	</div>
      </main>
    </>
  );
}

