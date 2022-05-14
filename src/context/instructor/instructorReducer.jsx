/* eslint-disable import/no-anonymous-default-export */
import {
    GET_INSTRUCTORS,
    GET_AN_INSTRUCTOR,
    GET_INSTRUCTOR_CLASS,
    SET_LOADING
} from '../types';

export default (state, action) => {

    switch (action.type) {
        
        case GET_INSTRUCTORS:
            return {
                ...state,
                instructors: action.payload,
                loading: false
            }
        
        case GET_AN_INSTRUCTOR:
            return {
                ...state,
                instructor: action.payload,
                loading: false
            }

        case GET_INSTRUCTOR_CLASS:
            return {
                ...state,
                instructorClass: action.payload,
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