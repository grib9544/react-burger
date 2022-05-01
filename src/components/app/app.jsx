
import React, { useReducer } from 'react';
import { AppHeader } from '../app-header/header'
import styles from './app.module.css'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { fetchIngredients } from '../../services/api';
import { FetchError } from '../../error';
import { ConstructorContext } from '../../services/contexts/constructor';
import { constructorReducer } from '../../services/reducers/constructor';

const initState = {
    ingredients: [],
    burger: [],
    totalCost: 0,
    order: null
}

export const App = () => {
    const [constrState, constrDispatcher] = useReducer(constructorReducer, initState);

    React.useEffect(() => {
        const getIngredients = async () => {
            try {
                const ingredients = await fetchIngredients();
                constrDispatcher({ type: 'SET_INGREDIENTS_LIST', payload: ingredients });
            } catch (error) {
                if (error instanceof FetchError) {
                    console.error(error.message)
                    return;
                }

                console.error(error)
            }
        }
        getIngredients();
    }, [])

  return (
    <>
        <AppHeader />
        <main className={styles.main}>
            {!!!constrState.ingredients.length && 
                <div className="text text_type_main-large">Загрузка...</div>
            }
            {!!constrState.ingredients.length && (
                <>
                    <h1 className="text text_type_main-large mb-5">
                        Соберите бургер
                    </h1>
                    <div className={styles.main__content}>
                        <ConstructorContext.Provider value={{ constrState, constrDispatcher}}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </ConstructorContext.Provider>
                    </div>
                </>
            )}
        </main>
    </>
  );
}
