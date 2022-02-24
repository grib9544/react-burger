
import { AppHeader } from '../app-header/header'
import styles from './app.module.css'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

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
          		<BurgerConstructor />
        	</div>
      </main>
    </>
  );
}

