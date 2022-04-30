
import React, { useReducer } from 'react';
import { AppHeader } from '../app-header/header'
import styles from './app.module.css'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { fetchIngredients } from '../../services/api';
import { FetchError } from '../../error';
import { ConstructorContext } from '../../services/contexts/constructor';

const initState = {
    ingredients: [],
    burger: [],
    totalCost: 0,
    order: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_INGREDIENTS_LIST':
            return {
                ...state,
                ingredients: action.payload
            }
        case 'SET_INGREDIENT':
            const addCost = action.payload.type === 'bun' 
                ? action.payload.price * 2 
                : action.payload.price;
            
            return {
                ...state,
                burger: [...state.burger, action.payload],
                totalCost: state.totalCost + addCost
            }
        case 'REMOVE_INGREDIENT':
            let burger = state.burger.filter(ing => ing._id !== action.payload._id);

            const removeCost = action.payload.type === 'bun' 
                ? action.payload.price * 2 
                : action.payload.price;

            return {
                ...state,
                burger: burger,
                totalCost: state.totalCost - removeCost
            }
        case 'RESET_ORDER':
            return {
                ...state,
                burger: [],
                totalCost: 0
            }
        default:
            return state
    }
}

export const App = () => {
    const [constrState, constrDispatcher] = useReducer(reducer, initState);

    React.useEffect(() => {
        const getIngredients = async () => {
            try {
                const ingredients = await fetchIngredients();
                constrDispatcher({ type: 'SET_INGREDIENTS_LIST', payload: ingredients });
            } catch (error) {
                if (error instanceof FetchError) {
                    console.log(error.message)
                    return;
                }

                console.log(error)
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
