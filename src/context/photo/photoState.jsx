import React, { useReducer } from 'react';
import Axios from 'axios';
import PhotoContext from './photoContext';
import PhotoReducer from './photoReducer';

import {
    GET_UNSPLASH_PHOTOS,
    SET_LOADING,
} from '../types';

const PhotoState = props => {

    const initialState = {
        photos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(PhotoReducer, initialState);

    // get photos
    const getPhotos = async (type) => {

        setLoading();

        const config = {
            params: { query: type },
            headers: {
                ContentType: 'application/json',
                Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
            } 
        }

        await Axios.get(`${process.env.REACT_APP_UNSPLASH_API_URL}`, config)
        .then((resp) => {

            dispatch({
                type: GET_UNSPLASH_PHOTOS,
                payload: resp.data.results
            })

        }).catch((err) => {
            console.log(`Could not get photos ${err}`);
        })
    }

    // set loading
    const setLoading = () => dispatch({type: SET_LOADING })

    return <PhotoContext.Provider 
        value={{
            photos: state.photos,
            loading: state.loading,
            getPhotos
        }}
    >
        { props.children }
    </PhotoContext.Provider>
}

export default PhotoState;
