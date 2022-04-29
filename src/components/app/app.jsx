
import React from 'react';
import { AppHeader } from '../app-header/header'
import styles from './app.module.css'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { fetchIngredients } from '../../services/api';
import { FetchError } from '../../error';
import { IngredientsContext } from '../../services/contexts/ingredients';


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

                setState({ ...state, error: 'Ой. Что-то пошло не так!', isLoading: false });
            }
        }
        getIngredients();
    }, [])

  return (
    <>
        <AppHeader />
        <main className={styles.main}>
            {state.isLoading && <div className="text text_type_main-large">Загрузка...</div>}
            {state.error && <div className="text text_type_main-large">{state.error}</div>}
            {!state.isLoading && !state.error && (
                <>
                    <h1 className="text text_type_main-large mb-5">
                        Соберите бургер
                    </h1>
                    <div className={styles.main__content}>
                        <IngredientsContext.Provider value={state.ingredients}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </IngredientsContext.Provider>
                    </div>
                </>
            )}
        </main>
    </>
  );
}

