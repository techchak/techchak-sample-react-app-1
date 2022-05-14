import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import storage from "../../components/helpers/storage";
import loader from "../../components/helpers/MainLoader";

import StudentReducer from "./studentReducer";
import StudentContext from "./studentContext"

import {
    GET_A_STUDENT,
    GET_STUDENTS,
    SET_LOADING
} from '../types';

const StudentState = (props) => {

    const history = useHistory();
    
    Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    const initialState = {
        stduent: {},
        stduents: [],
        loading: false 
    };

    const [state, dispatch] = useReducer(StudentReducer, initialState);

    const logout = async (e) => {
        if (e) e.preventDefault();

        storage.clearAuth();
        history.push('/');

    };


    const getStudents = async () => {
        setLoading()
        try {

            await Axios.get(`${process.env.REACT_APP_URL}/students/getstudents`, storage.getConfigWithBearer())
            .then((resp) => {

                dispatch({
                    type: GET_STUDENTS,
                    payload: resp.data.data
                });

            }).catch((err) => {

                if(err && err.response && err.response.data && err.response.data.error && err.response.status === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get students ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get students ${err}`)
    
                }
                
            })
            
        } catch (err) {
            
            if(err && err.response && err.response.data && err.response.data.error && err.response.status === 401){

                logout();

            }else if(err && err.response && err.response.data){

                console.log(`Error! Could not get students ${err.response.data}`)

            }else if(err && err.toString() === 'Error: Network Error'){

                loader.popNetwork();

            }else if(err){

                console.log(`Error! Could not get students ${err}`)

            }
            
        }
    }; 
    
    const getStudent = async (id) => {
        setLoading()
        try {

            await Axios.get(`${process.env.REACT_APP_URL}/students/getstudent/${id}`, storage.getConfigWithBearer())
            .then((resp) => {

                dispatch({
                    type: GET_A_STUDENT,
                    payload: resp.data.data.student
                });

            }).catch((err) => {

                if(err && err.response && err.response.data && err.response.data.error && err.response.status === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get students ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get students ${err}`)
    
                }
                
            })
            
        } catch (err) {
            
            if(err && err.response && err.response.data && err.response.data.error && err.response.status === 401){

                logout();

            }else if(err && err.response && err.response.data){

                console.log(`Error! Could not get students ${err.response.data}`)

            }else if(err && err.toString() === 'Error: Network Error'){

                loader.popNetwork();

            }else if(err){

                console.log(`Error! Could not get students ${err}`)

            }
            
        }
    }; 

    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    };

    return <StudentContext.Provider
        value={{
            stduents: state.stduents,
            stduent: state.stduent,
            loading: state.loading,
            getStudents,
            getStudent
        }}
    >
        {props.children}
    </StudentContext.Provider>
}

export default StudentState;