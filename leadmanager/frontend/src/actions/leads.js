import axios from 'axios';
import { GET_LEADS, GET_ERRORS } from './types'
import { DELETE_LEADS, ADD_LEADS } from './types'
import { createMessages } from './messages'

// GET LEADS

export const getLeads = () => dispatch => {
    axios.get('/api/leads/')
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data
            })
        }).catch(err => console.log(err));
}


// DELETE LEADS

export const deleteLeads = id => dispatch => {
    axios.delete(`/api/leads/${id}/`)
        .then((res) => {
            dispatch(createMessages({ deletedLead: "Lead Deleted" }));
            dispatch({
                type: DELETE_LEADS,
                payload: id
            })
        }).catch(err => console.log(err));
}


//CREATE LEADS
export const addLeads = (lead) => dispatch => {
    axios.post('/api/leads/', lead)
        .then(res => {
            dispatch(createMessages({ addLead: "Lead Added" }))
            dispatch({
                type: ADD_LEADS,
                payload: res.data
            })
        }).catch(err => {
            const errors = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        });
}