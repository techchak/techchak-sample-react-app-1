// eslint-disable-next-line
/* eslint-disable */
import {
    GET_EVENTS,
    GET_AN_EVENT,
    GET_TESTIMONIAL,
    GET_ALL_TESTIMONIALS,
    SET_LOADING,
} from '../types';


export default (state, action) => {

    switch(action.type){

        case GET_EVENTS: 
            return {
                ...state,
                events: action.payload,
                loading: false
            }

        case GET_AN_EVENT: 
            return {
                ...state,
                event: action.payload,
                loading: false
            }

            case GET_TESTIMONIAL: 
            return {
                ...state,
                testimonial: action.payload,
                loading: false
            }

            case GET_ALL_TESTIMONIALS:
            return {
                ...state,
                testimonials: action.payload,
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