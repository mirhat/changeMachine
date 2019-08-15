import { ADD_COINS_STOCK } from "../constants/action-types";
import { EDIT_COINS_STOCK } from "../constants/action-types";
import { DELETE_COINS_STOCK } from "../constants/action-types";
import { UPDATE_COINS_STOCK_NUMBER_OF_ITEMS } from "../constants/action-types";

export function addCoinsStock(payload) {
    return { type: ADD_COINS_STOCK, payload }
};

export function editCoinsStock(payload) {
    return { type: EDIT_COINS_STOCK, payload }
};

export function deleteCoinsStock(payload) {
    return { type: DELETE_COINS_STOCK, payload }
};

export function updateCoinsStockNumberOfItems(payload) {
    return { type: UPDATE_COINS_STOCK_NUMBER_OF_ITEMS, payload }
};