import axios from 'axios';
import { GET_LEADS, GET_ERRORS } from './types'
import { DELETE_LEADS, ADD_LEADS } from './types'
import { createMessages, returnErrors } from './messages'
import { tokenConfig } from './auth'

// GET LEADS

export const getLeads = () => (dispatch, getState) => {
    axios.get('/api/leads/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


// DELETE LEADS

export const deleteLeads = id => (dispatch, getState) => {
    axios.delete(`/api/leads/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessages({ deletedLead: "Lead Deleted" }));
            dispatch({
                type: DELETE_LEADS,
                payload: id
            })
        }).catch(err => console.log(err));
}


//CREATE LEADS
export const addLeads = (lead) => (dispatch, getState) => {
    axios.post('/api/leads/', lead, tokenConfig(getState))
        .then(res => {
            dispatch(createMessages({ addLead: "Lead Added" }))
            dispatch({
                type: ADD_LEADS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}