
import {
    Import_Opportunity,
    Delete_Opportunity,Delete_Opportunity_Success,Delete_Opportunity_Clear,
    Add_Edit_Opportunity,Add_Edit_Opportunity_Success,Add_Edit_Opportunity_Clear,} from './actionTypes';
import BaseUrl from '../../../const'

export const importOpportunity = (res, token, cProfile, org_id) => {
    return (dispatch) => {
        dispatch({ type: Import_Opportunity })
        fetch(`${BaseUrl}/v1/import-opportunity`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': "application/x-www-form-urlencoded",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    // 'Authorization': uid,
                },
                body: JSON.stringify({
                    CSVFILE: res,
                    orgid: org_id,
                    profile_id: cProfile
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: Import_Opportunity, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};



export const addOpportunity = (data,token) => {
    return (dispatch) => {
        dispatch({ type: Add_Edit_Opportunity })
        fetch(`${BaseUrl}/v1/opportunityAddEdit`,
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
                dispatch({ type: Add_Edit_Opportunity_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const deleteOpportunity = (data,token,) => {
    return (dispatch) => {
        dispatch({ type: Delete_Opportunity })
        fetch(`${BaseUrl}/v1/delete-Opportinity`,
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
                dispatch({ type: Delete_Opportunity_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const clearResponse = () => {
    return {
        type: Add_Edit_Opportunity_Clear,
        type: Delete_Opportunity_Clear,
    };
};


