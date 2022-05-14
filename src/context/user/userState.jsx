/* eslint-disable */
import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom'
import Axios from 'axios';
import storage from '../../components/helpers/storage'
import loader from '../../components/helpers/MainLoader'

import UserContext from './userContext';
import UserReducer from './userReducer';


import {
    GET_STUDENT_TRANSAC,
    GET_USER,
    GET_ALL_INSTRUCTORS,
    SET_LOADING,
} from '../types'

const UserState = (props) => {

    const history = useHistory();
    Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

 
    const initialState = {
        user: {},
        transac: {},
        allInstructors : [],
        status: {},
        loading: false,
    }

    const [state, dispatch] = useReducer(UserReducer, initialState);


    const logout = async (e) => {

        if(e) e.preventDefault();

        storage.clearAuth();
        history.push('/login');
        // await Axios.post(`${process.env.REACT_APP_AUTH_URL}/auth/logout`,{}, storage.getConfig());
    }

    const getUser = async (id) => {

        setLoading()
            try {

                await Axios.get(`${process.env.REACT_APP_URL}/users/get-instructor/${id}`, storage.getConfigWithBearer())
                .then((resp) => {

                    dispatch({
                        type: GET_USER,
                        payload: resp.data.data
                    });

                }).catch((err) => {

                    if(err && err.response && err.response.data && err.response.data.error && err.response.status === 401){

                        logout();
        
                    }else if(err && err.response && err.response.data){
        
                        console.log(`Error! Could not get logged in user ${err.response.data}`)
        
                    }else if(err && err.toString() === 'Error: Network Error'){
        
                        loader.popNetwork();
        
                    }else if(err){
        
                        console.log(`Error! Could not get logged in user ${err}`)
        
                    }
                    
                })
                
            } catch (err) {
                
                if(err && err.response && err.response.data && err.response.data.error && err.response.status === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get logged in user ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get logged in user ${err}`)
    
                }
                
            }

        

    }

    const getAllInstructors = async () => {

        setLoading()
            try {

                await Axios.get(`${process.env.REACT_APP_URL}/users/get-instructors`, storage.getConfigWithBearer())
                .then((resp) => {

                    dispatch({
                        type: GET_ALL_INSTRUCTORS,
                        payload: resp.data.data.instructors
                    });

                }).catch((err) => {

                    if(err && err.response && err.response.data && err.response.data.error && err.response.status === 401){

                        logout();
        
                    }else if(err && err.response && err.response.data){
        
                        console.log(`Error! Could not get logged in user ${err.response.data}`)
        
                    }else if(err && err.toString() === 'Error: Network Error'){
        
                        loader.popNetwork();
        
                    }else if(err){
        
                        console.log(`Error! Could not get logged in user ${err}`)
        
                    }
                    
                })
                
            } catch (err) {
                
                if(err && err.response && err.response.data && err.response.data.error  && err.response.status === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get logged in user ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get logged in user ${err}`)
    
                }
                
            }

        

    }

    const getAStudent = async (id) => {

        setLoading()
            try {

                await Axios.get(`${process.env.REACT_APP_URL}/users/get-student/${id}`, storage.getConfigWithBearer())
                .then((resp) => {

                    dispatch({
                        type: GET_USER,
                        payload: resp.data.data
                    });
                    // err.response.data.error
                }).catch((err) => {

                    if(err && err.response && err.response.data && err.response.data.error === 401){

                        logout();
        
                    }else if(err && err.response && err.response.data){
        
                        // console.log(`Error! Could not get logged in user ${err.response.data}`)
        
                    }else if(err && err.toString() === 'Error: Network Error'){
        
                        loader.popNetwork();
        
                    }else if(err){
        
                        console.log(`Error! Could not get logged in user ${err}`)
        
                    }
                    
                })
                
            } catch (err) {
                
                if(err && err.response && err.response.data && err.response.data.error && err.response.status === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get logged in user ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get logged in user ${err}`)
    
                }
                
            }

        

    }


    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    return <UserContext.Provider
        value={{
            user: state.user,
          
            student: state.student,
            allInstructors: state.allInstructors,
            loading: state.loading,
            getAllInstructors,
            getUser,
            getAStudent,
           
        }}
    >
        {props.children}

    </UserContext.Provider>

    

}

export default UserState;