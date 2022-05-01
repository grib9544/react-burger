function calculateTotalCost (ingredients) {
    return ingredients.reduce((acc, curr) => acc + curr.price, 0)
}

export const constructorReducer = (state, action) => {
    switch (action.type) {
        case 'SET_INGREDIENTS_LIST':
            return {
                ...state,
                ingredients: action.payload
            }
        case 'SET_INGREDIENT':
            if (action.payload.type !== 'bun' ) {
                const burger = [...state.burger, action.payload]

                return {
                    ...state,
                    burger: [...state.burger, action.payload],
                    totalCost: calculateTotalCost(burger)
                } 
            }

            const bunBurger = [
                ...state.burger.filter(ing => ing.type !== 'bun'), 
                action.payload, 
                action.payload
            ]
            
            return {
                ...state,
                burger: bunBurger,
                totalCost: calculateTotalCost(bunBurger)
            }
        case 'REMOVE_INGREDIENT':
            const removeBurger = state.burger.filter(ing => ing.constrId !== action.payload.constrId)

            return {
                ...state,
                burger: removeBurger,
                totalCost: calculateTotalCost(removeBurger)
            }
        case 'SET_ORDER':
            return {
                ...state,
                order: action.payload,
                burger: [],
                totalCost: 0
            }
        default:
            return state
    }
}