
import React from 'react';
import { AppHeader } from '../app-header'
import styles from './app.module.css'
import { BurgerIngredients } from '../burger-ingredients';

export const App = () => {

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        	<h1 className="text text_type_main-large mb-5">
          		Соберите бургер
       		</h1>
        	<div className={styles.main__content}>
				<BurgerIngredients />
          		<div className={styles.main__tab2}>
            		lol
          		</div>
        	</div>
      </main>
    </>
  );
}

