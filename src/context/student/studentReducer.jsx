/* eslint-disable import/no-anonymous-default-export */
import {
    GET_STUDENTS,
    GET_A_STUDENT,
    SET_LOADING
} from '../types';

export default (state, action) => {

    switch (action.type) {
        
        case GET_STUDENTS:
            return {
                ...state,
                stduents: action.payload,
                loading: false
            }
        
        case GET_A_STUDENT:
            return {
                ...state,
                stduent: action.payload,
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