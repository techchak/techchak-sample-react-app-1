 // eslint-disable-next-line
  /* eslint-disable */
import { 
    GET_UNSPLASH_PHOTOS,
    SET_LOADING
 } from '../types';

 export default (state, action) => {

    switch(action.type){
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
        default: return state;
    }

}
