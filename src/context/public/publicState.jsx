// eslint-disable-next-line
/* eslint-disable */
import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom'
import Axios from 'axios';
import storage from '../../components/helpers/storage'
import loader from '../../components/helpers/MainLoader'

import PublicContext from './publicContext';
import PublicReducer from './publicReducer';

import {
    GET_EVENTS,
    GET_AN_EVENT,
    GET_TESTIMONIAL,
    GET_ALL_TESTIMONIALS,
    SET_LOADING,
} from '../types';

const PublicState = (props) => {

    const history = useHistory();
    Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    const [show, setShowNetwork] = useState(true)

    const initialState = {
        event:{},
        events:[],
        testimonial:{},
        testimonials:[],

        loading: false,
    }

    const [state, dispatch] = useReducer(PublicReducer, initialState);


    const logout = async (e) => {

        if(e) e.preventDefault();

        storage.clearAuth();
        history.push('/login');
        await Axios.post(`${process.env.REACT_APP_URL}/auth/logout`,{}, storage.getConfig());
    }

    const getAllEvents = async () => {

        setLoading()
            try {

                await Axios.get(`${process.env.REACT_APP_URL}/admin/event`, storage.getConfigWithBearer())
                .then((resp) => {

                    dispatch({
                        type: GET_EVENTS,
                        payload: resp.data.data
                    });

                }).catch((err) => {

                    if(err && err.response && err.response.data && err.response.data.error === 401){

                        logout();
        
                    }else if(err && err.response && err.response.data){
        
                        console.log(`Error! Could not all events${err.response.data}`)
        
                    }else if(err && err.toString() === 'Error: Network Error'){
        
                        loader.popNetwork();
        
                    }else if(err){
        
                        console.log(`Error! Could not get events ${err}`)
        
                    }
                    
                })
                
            } catch (err) {
                
                if(err && err.response && err.response.data && err.response.data.error === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get events ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get events ${err}`)
    
                }
                
            }

    }

    
    const getAnEvent = async (id) => {

        setLoading()
            try {

                await Axios.get(`${process.env.REACT_APP_URL}/admin/event/${id}`, storage.getConfigWithBearer())
                .then((resp) => {

                    dispatch({
                        type: GET_AN_EVENT,
                        payload: resp.data.data.event
                    });

                }).catch((err) => {

                    if(err && err.response && err.response.data && err.response.data.error === 401){

                        logout();
        
                    }else if(err && err.response && err.response.data){
        
                        console.log(`Error! Could not get an event ${err.response.data}`)
        
                    }else if(err && err.toString() === 'Error: Network Error'){
        
                        loader.popNetwork();
        
                    }else if(err){
        
                        console.log(`Error! Could not get an event ${err}`)
        
                    }
                    
                })
                
            } catch (err) {
                
                if(err && err.response && err.response.data && err.response.data.error === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get an event ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get an event ${err}`)
    
                }
                
            }

    }


    const getAllTestimonials = async () => {

        setLoading()
            try {

                await Axios.get(`${process.env.REACT_APP_URL}/admin/testimonial`, storage.getConfigWithBearer())
                .then((resp) => {

                    dispatch({
                        type: GET_ALL_TESTIMONIALS,
                        payload: resp.data.data
                    });

                }).catch((err) => {

                    if(err && err.response && err.response.data && err.response.data.error === 401){

                        logout();
        
                    }else if(err && err.response && err.response.data){
        
                        console.log(`Error! Could not get testimonials${err.response.data}`)
        
                    }else if(err && err.toString() === 'Error: Network Error'){
        
                        loader.popNetwork();
        
                    }else if(err){
        
                        console.log(`Error! Could not get testimonials${err}`)
        
                    }
                    
                })
                
            } catch (err) {
                
                if(err && err.response && err.response.data && err.response.data.error === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get testimonials${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get testimonials${err}`)
    
                }
                
            }

    }


    const getATestimonial = async (id) => {

        setLoading()
            try {

                await Axios.get(`${process.env.REACT_APP_URL}/admin/testimonial/${id}`, storage.getConfigWithBearer())
                .then((resp) => {

                    dispatch({
                        type:GET_TESTIMONIAL,
                        payload: resp.data.data.testimonial
                    });

                }).catch((err) => {

                    if(err && err.response && err.response.data && err.response.data.error === 401){

                        logout();
        
                    }else if(err && err.response && err.response.data){
        
                        console.log(`Error! Could not get testimonial ${err.response.data}`)
        
                    }else if(err && err.toString() === 'Error: Network Error'){
        
                        loader.popNetwork();
        
                    }else if(err){
        
                        console.log(`Error! Could not get testimonial ${err}`)
        
                    }
                    
                })
                
            } catch (err) {
                
                if(err && err.response && err.response.data && err.response.data.error === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get testimonial ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get testimonial ${err}`)
    
                }
                
            }

    }
    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    return <PublicContext.Provider
        value={{
            events: state.events,
            event: state.event,
            testimonial: state.testimonial,
            testimonials: state.testimonials,
            loading: state.loading,
            // getUsers,
            getAllEvents,
            getAnEvent,
            getAllTestimonials,
            getATestimonial
        }}
    >
        {props.children}

    </PublicContext.Provider>

    

}

export default PublicState;