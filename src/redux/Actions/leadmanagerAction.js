import {
    Get_Lead_Opportunity, Lead_Opportunity_Success, Lead_Opportunity_Clear,
    LeadAssign, LeadAssign_Success, LeadAssign_Clear,
    TLead_Opportunity, TLead_Opportunity_Success, TLead_Opportunity_Clear,
    LeadTransfer, LeadTransfer_Success, LeadTransfer_Clear,
    LeadDetail, LeadDetail_Success, LeadDetail_Clear
} from './actionTypes'
import { BaseUrl, Base_NodeUrl } from '../../../const';

export const GetDetail = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: LeadDetail })
        fetch(`${Base_NodeUrl}/getleadDetails`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: LeadDetail_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const lead_OpprtunityList = (data, token) => {
    return (dispatch) => {
        dispatch({ type: Get_Lead_Opportunity })
        fetch(`${Base_NodeUrl}/getLeadList`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: Lead_Opportunity_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const AssignLead = (data, token) => {
    return (dispatch) => {
        dispatch({ type: LeadAssign })
        fetch(`${Base_NodeUrl}/assignLead`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: LeadAssign_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const lead_OpprtunityTransferList = (data, token) => {
    return (dispatch) => {
        dispatch({ type: TLead_Opportunity })
        fetch(`${Base_NodeUrl}/getLeadList`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: TLead_Opportunity_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const TranferLead = (data, token) => {
    return (dispatch) => {
        dispatch({ type: LeadTransfer })
        fetch(`${Base_NodeUrl}/transferLead`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: LeadTransfer_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const clearResponse = () => {
    return {
        type: Lead_Opportunity_Clear,
        type: LeadAssign_Clear,
        type: TLead_Opportunity_Clear,
        type: LeadTransfer_Clear,
        type: LeadDetail_Clear
    };
};