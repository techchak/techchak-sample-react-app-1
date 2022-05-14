import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import storage from '../../components/helpers/storage'
import loader from '../../components/helpers/MainLoader'

import TransactionContext from "./transactionContext";
import TransactionReducer from "./transactionReducer";

import {
    GET_A_TRANSACTION,
    GET_ALL_TRANSACTIONS,
    SET_LOADING
} from '../types';

const TransactionState = (props) => {

    const history = useHistory();

    Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    const initialState = {
        transaction: {},
        transactions: [],
        loading: false
    };

    const [state, dispatch] = useReducer(TransactionReducer, initialState);

    const logout = async (e) => {
        if (e) e.preventDefault();

        storage.clearAuth();
        history.push('/');

    };

    const getTransactions = async () => {
        setLoading()
        try {

            await Axios.get(`${process.env.REACT_APP_URL}/transactions`, storage.getConfigWithBearer())
            .then((resp) => {

                dispatch({
                    type: GET_ALL_TRANSACTIONS,
                    payload: resp.data.data
                });

            }).catch((err) => {

                if(err && err.response && err.response.data && err.response.data.error && err.response.status === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get transactions ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get transactions ${err}`)
    
                }
                
            })
            
        } catch (err) {
            
            if(err && err.response && err.response.data && err.response.data.error && err.response.status === 401){

                logout();

            }else if(err && err.response && err.response.data){

                console.log(`Error! Could not get trasanctions ${err.response.data}`)

            }else if(err && err.toString() === 'Error: Network Error'){

                loader.popNetwork();

            }else if(err){

                console.log(`Error! Could not get transactions ${err}`)

            }
            
        }
    };
    
    const getTransaction = async (id) => {
        setLoading()
        try {

            await Axios.get(`${process.env.REACT_APP_URL}/transaction/${id}`, storage.getConfigWithBearer())
            .then((resp) => {

                dispatch({
                    type: GET_A_TRANSACTION,
                    payload: resp.data.data
                });

            }).catch((err) => {

                if(err && err.response && err.response.data && err.response.data.status === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get transaction ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get transaction ${err}`)
    
                }
                
            })
            
        } catch (err) {
            
            if(err && err.response && err.response.data && err.response.data.status === 401){

                logout();

            }else if(err && err.response && err.response.data){

                console.log(`Error! Could not get transaction ${err.response.data}`)

            }else if(err && err.toString() === 'Error: Network Error'){

                loader.popNetwork();

            }else if(err){

                console.log(`Error! Could not get transaction ${err}`)

            }
            
        }
    };

    const setLoading = () => {
        dispatch({
            type: SET_LOADING,
        })
    }

    return <TransactionContext.Provider
        value={{
            transactions: state.transactions,
            transaction: state.transaction,
            loading: state.loading,
            getTransactions,
            getTransaction
        }}
    >
        {props.children}
    </TransactionContext.Provider>
};

export default TransactionState;