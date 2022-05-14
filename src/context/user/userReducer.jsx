/* eslint-disable */
import {
    GET_STUDENT,
    GET_USER,
    GET_STUDENT_TRANSAC,
    GET_ALL_INSTRUCTORS,
    SET_LOADING,
} from '../types';

export default (state, action) => {

    switch(action.type){

        case GET_STUDENT: 
            return {
                ...state,
                user: action.payload,
                loading: false
            }

        case GET_USER: 
            return {
                ...state,
                user: action.payload,
                loading: false
            }

            case GET_ALL_INSTRUCTORS: 
            return {
                ...state,
                allInstructors: action.payload,
                loading: false
            }

            case GET_STUDENT_TRANSAC: 
            return {
                ...state,
                allInstructors: action.payload,
                transac: false
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