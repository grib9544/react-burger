
import React from 'react';
import { AppHeader } from '../app-header/header'
import styles from './app.module.css'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { fetchIngredients } from '../../service';
import { FetchError } from '../../error';


export const App = () => {
    const [state, setState] = React.useState({
        ingredients: [],
        isLoading: false,
        error: '',
    });

    React.useEffect(() => {
        const getIngredients = async () => {
            try {
                setState({ ...state, isLoading: true });

                const ingredients = await fetchIngredients();

                setState({ ...state, ingredients, isLoading: false });
            } catch (error) {
                if (error instanceof FetchError) {
                    setState({ ...state, error: error.message, isLoading: false });

                    return;
                }

                setState({ ...state, error: 'Oops. Something went wrong', isLoading: false });
            }
        }
        getIngredients();
    }, [])

  return (
    <>
        <AppHeader />
        <main className={styles.main}>
            {state.isLoading && <div className="text text_type_main-large">Loading...</div>}
            {state.error && <div className="text text_type_main-large">{state.error}</div>}
            {!state.isLoading && !state.error && (
                <>
                    <h1 className="text text_type_main-large mb-5">
                        Соберите бургер
                    </h1>
                    <div className={styles.main__content}>
                        <BurgerIngredients ingredients={state.ingredients} />
                        <BurgerConstructor />
                    </div>
                </>
            )}
        </main>
    </>
  );
}

