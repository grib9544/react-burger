function calculateTotalCost(burger) {
    return burger.filling.reduce((acc, curr) => acc + curr.price, 0) + (burger.bun?.price || 0) * 2;
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
                const updatedfilling = {
                    ...state.burger,
                    filling: [...state.burger.filling, action.payload]
                }

                return {
                    ...state,
                    burger: updatedfilling,
                    totalCost: calculateTotalCost(updatedfilling)
                } 
            }

            const updatedBuns = {
                ...state.burger,
                bun: action.payload
            }
            
            return {
                ...state,
                burger: updatedBuns,
                totalCost: calculateTotalCost(updatedBuns)
            }
        case 'REMOVE_INGREDIENT':
            const filling = state.burger.filling
                .filter(ing => ing.constrId !== action.payload.constrId)

            const removeFilling = {
                ...state.burger,
                filling: filling
            }

            return {
                ...state,
                burger: removeFilling,
                totalCost: calculateTotalCost(removeFilling)
            }
        case 'SET_ORDER':
            return {
                ...state,
                order: action.payload,
                burger: {
                    bun: null,
                    filling: []
                },
                totalCost: 0
            }
        default:
            return state
    }
}