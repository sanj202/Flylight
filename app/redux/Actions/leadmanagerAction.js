import {
    Get_Lead_Opportunity, Lead_Opportunity_Success, Lead_Opportunity_Clear,
    LeadAssign, LeadAssign_Success, LeadAssign_Clear
} from './actionTypes'
import BaseUrl from '../../../const';

export const lead_OpprtunityList = (data, token) => {
    // console.log(data)
    return (dispatch) => {
        dispatch({ type: Get_Lead_Opportunity })
        fetch(`http://3.23.113.168:3000/getLeadList`,
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
        fetch(`http://3.23.113.168:3000/assignLead`,
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

export const clearResponse = () => {
    return {
        type: Lead_Opportunity_Clear,
        type : LeadAssign_Clear ,
    };
};
