import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import storage from '../../components/helpers/storage'
import loader from '../../components/helpers/MainLoader'

import CourseContext from "./courseContext";
import CourseReducer from "./courseReducer";

import {
    GET_COURSES,
    GET_A_COURSE,
    SET_LOADING
} from '../types';

const CourseState = (props) => {

    const history = useHistory();

    Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    const initialState = {
        course: {},
        courses: [],
        loading: false
    };

    const [state, dispatch] = useReducer(CourseReducer, initialState);

    const logout = async (e) => {
        if (e) e.preventDefault();

        storage.clearAuth();
        history.push('/');

    };

    const getCourses = async () => {
        setLoading()
        try {

            await Axios.get(`${process.env.REACT_APP_URL}/courses`, storage.getConfigWithBearer())
            .then((resp) => {

                dispatch({
                    type: GET_COURSES,
                    payload: resp.data.data
                });

            }).catch((err) => {

                if(err && err.response && err.response.data && err.response.status === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get courses ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get courses ${err}`)
    
                }
                
            })
            
        } catch (err) {
            
            if(err && err.response && err.response.data && err.response.status === 401){

                logout();

            }else if(err && err.response && err.response.data){

                console.log(`Error! Could not get courses ${err.response.data}`)

            }else if(err && err.toString() === 'Error: Network Error'){

                loader.popNetwork();

            }else if(err){

                console.log(`Error! Could not get instructors ${err}`)

            }
            
        }
    };
    
    const getCourse = async (id) => {
        setLoading()
        try {

            await Axios.get(`${process.env.REACT_APP_URL}/courses/${id}`, storage.getConfigWithBearer())
            .then((resp) => {

                dispatch({
                    type: GET_A_COURSE,
                    payload: resp.data.data.course
                });

            }).catch((err) => {

                if(err && err.response && err.response.data && err.response.data.status === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get course ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get course ${err}`)
    
                }
                
            })
            
        } catch (err) {
            
            if(err && err.response && err.response.data && err.response.data.status === 401){

                logout();

            }else if(err && err.response && err.response.data){

                console.log(`Error! Could not get course ${err.response.data}`)

            }else if(err && err.toString() === 'Error: Network Error'){

                loader.popNetwork();

            }else if(err){

                console.log(`Error! Could not get course ${err}`)

            }
            
        }
    };

    const setLoading = () => {
        dispatch({
            type: SET_LOADING,
        })
    }

    return <CourseContext.Provider
        value={{
            courses: state.courses,
            course: state.course,
            loading: state.loading,
            getCourses,
            getCourse
        }}
    >
        {props.children}
    </CourseContext.Provider>
};

export default CourseState;