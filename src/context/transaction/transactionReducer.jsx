/* eslint-disable import/no-anonymous-default-export */
import {
  GET_A_TRANSACTION,
  GET_ALL_TRANSACTIONS,
    SET_LOADING
} from '../types'

export default (state, action) => {

    switch (action.type) {
        case GET_A_TRANSACTION:
            return {
                ...state,
                transaction: action.payload,
                loading: false
            }

        case GET_ALL_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload,
                loading: false
            }

         
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }

            default: 
                return state;
    }
}