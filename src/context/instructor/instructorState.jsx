import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import storage from "../../components/helpers/storage";
import loader from "../../components/helpers/MainLoader";

import InstructorContext from "./instructorContext";
import InstructorReducer from "./instructorReducer";

import {
    GET_INSTRUCTORS,
    GET_AN_INSTRUCTOR,
    SET_LOADING
} from '../types';

const InstructorState = (props) => {

    const history = useHistory();
    
    Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    const initialState = {
        instructor: {},
        instructors: [],
        loading: false 
    };

    const [state, dispatch] = useReducer(InstructorReducer, initialState);

    const logout = async (e) => {
        if (e) e.preventDefault();

        storage.clearAuth();
        history.push('/');

    };

    const getInstructors = async () => {
        setLoading()
        try {

            await Axios.get(`${process.env.REACT_APP_URL}/instructors`, storage.getConfigWithBearer())
            .then((resp) => {

                dispatch({
                    type: GET_INSTRUCTORS,
                    payload: resp.data.data.instruct
                });

            }).catch((err) => {

                if(err && err.response && err.response.data && err.response.data.status === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get instructors ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get instructors ${err}`)
    
                }
                
            })
            
        } catch (err) {
            
            if(err && err.response && err.response.data && err.response.data.status === 401){

                logout();

            }else if(err && err.response && err.response.data){

                console.log(`Error! Could not get instructors ${err.response.data}`)

            }else if(err && err.toString() === 'Error: Network Error'){

                loader.popNetwork();

            }else if(err){

                console.log(`Error! Could not get instructors ${err}`)

            }
            
        }
    }; 
    
    const getInstructor = async (id) => {
        setLoading()
        try {

            await Axios.get(`${process.env.REACT_APP_URL}/instructors/${id}`, storage.getConfigWithBearer())
            .then((resp) => {

                dispatch({
                    type: GET_AN_INSTRUCTOR,
                    payload: resp.data.data.instructor
                });

            }).catch((err) => {

                if(err && err.response && err.response.data && err.response.data.status === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get instructors ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get instructors ${err}`)
    
                }
                
            })
            
        } catch (err) {
            
            if(err && err.response && err.response.data && err.response.data.status === 401){

                logout();

            }else if(err && err.response && err.response.data){

                console.log(`Error! Could not get instructors ${err.response.data}`)

            }else if(err && err.toString() === 'Error: Network Error'){

                loader.popNetwork();

            }else if(err){

                console.log(`Error! Could not get instructors ${err}`)

            }
            
        }
    }; 

    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    };

    return <InstructorContext.Provider
        value={{
            instructors: state.instructors,
            instructor: state.instructor,
            loading: state.loading,
            getInstructors,
            getInstructor
        }}
    >
        {props.children}
    </InstructorContext.Provider>
}

export default InstructorState;