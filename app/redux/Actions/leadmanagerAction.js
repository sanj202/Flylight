import {
    Get_Lead_Opportunity, Lead_Opportunity_Success, Lead_Opportunity_Clear,
    LeadAssign, LeadAssign_Success, LeadAssign_Clear,
    TLead_Opportunity, TLead_Opportunity_Success, TLead_Opportunity_Clear,
    LeadTransfer, LeadTransfer_Success, LeadTransfer_Clear,
} from './actionTypes'
import { BaseUrl, Base_NodeUrl } from '../../../const';

export const lead_OpprtunityList = (data, token) => {
    // console.log(data)
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
                // console.log(responseData.data)
                dispatch({ type: Lead_Opportunity_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const AssignLead = (data, token) => {
    // console.log(data, token)
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
                // console.log(responseData)
                dispatch({ type: LeadAssign_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const lead_OpprtunityTransferList = (data, token) => {
    // console.log(data)
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
                // console.log(responseData.data)
                dispatch({ type: TLead_Opportunity_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const TranferLead = (data, token) => {
    // console.log(data, token)
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
                // console.log(responseData)
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
    };
};
