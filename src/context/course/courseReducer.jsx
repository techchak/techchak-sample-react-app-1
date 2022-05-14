/* eslint-disable import/no-anonymous-default-export */
import {
    GET_COURSES,
    GET_A_COURSE,
    SET_COURSES_PAGINATION,
    GET_LIMIT__COURSES,
    GET_UNSPLASH_PHOTOS,
    SET_LOADING
} from '../types'

export default (state, action) => {

    switch (action.type) {
        case GET_COURSES:
            return {
                ...state,
                courses: action.payload,
                loading: false
            }

        case GET_A_COURSE:
            return {
                ...state,
                course: action.payload,
                loading: false
            }

            case SET_COURSES_PAGINATION: 
            return {
                ...state,
                pagination: action.payload,
                loading: false
            }

            case GET_LIMIT__COURSES: 
            return {
                ...state,
                limitCourses: action.payload,
                loading: false
            }
            case GET_UNSPLASH_PHOTOS:
                return {
                    ...state,
                    photos: action.payload,
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