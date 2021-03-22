import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlertState = props => {   // initial state
    const initialState = null; //as there is only one state variable alert = null, might as well assign as null to initial state

    const [state, dispatch] =  useReducer(AlertReducer, initialState);

   // set alert
   const setAlert = (msg, type) => {

    dispatch({
        type: SET_ALERT,
        payload: {msg, type},

    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };


    // value is prop which is basically state variables which are to be made available to the entire project 
    return (
    <AlertContext.Provider 
        value = {{
            alert: state,
            setAlert
        }} 
    >
        {props.children}
    </AlertContext.Provider>
    );
};

export default AlertState;