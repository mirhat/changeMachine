import { ADD_COINS_STOCK, EDIT_COINS_STOCK, DELETE_COINS_STOCK, UPDATE_COINS_STOCK_NUMBER_OF_ITEMS } from "../constants/action-types";

const initialState = {
    coinsStock: [
        {
            id: 1,
            denomination: 0.1,
            numberOfItems: 100,
        },
        {
            id: 2,
            denomination: 0.2,
            numberOfItems: 100,
        },
        {
            id: 3,
            denomination: 0.5,
            numberOfItems: 100,
        },
        {
            id: 4,
            denomination: 1,
            numberOfItems: 100,
        },
        {
            id: 5,
            denomination: 2,
            numberOfItems: 100,
        },
        {
            id: 6,
            denomination: 5,
            numberOfItems: 100,
        },
    ]
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_COINS_STOCK) {
        var nextId = state.coinsStock.length > 0 ? 
                        Math.max.apply(null, state.coinsStock.map(a => a.id)) + 1 
                        : 1;

        return Object.assign({}, state, {
            coinsStock: state.coinsStock.concat([Object.assign(action.payload, {id: nextId})])
        });
    }

    if (action.type === EDIT_COINS_STOCK) {
        return Object.assign({}, state, {
            coinsStock: state.coinsStock.map(el => (el.id === action.payload.id ? Object.assign({}, el, action.payload) : el))
        });
    }

    if (action.type === DELETE_COINS_STOCK) {
        return Object.assign({}, state, {
            coinsStock: state.coinsStock.filter(function (coinStock) {
                return coinStock.id !== action.payload.id
            })
        });
    }

    if (action.type === UPDATE_COINS_STOCK_NUMBER_OF_ITEMS) {
        var newCoinsStock = Object.assign({}, state.coinsStock);
        newCoinsStock = state.coinsStock.map((a) => {
            let coinStock = action.payload.find(p => p.coin == a.denomination);
            if (coinStock != null) {
                a.numberOfItems -= coinStock.numberOfItems;
            }
            return a;
        })
        
        return Object.assign({}, state, {
            coinsStock: newCoinsStock
        });
    }
    return state;
};

export default rootReducer;