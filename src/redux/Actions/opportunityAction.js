
import {
    Import_Opportunity, Import_Opportunity_Success, Import_Opportunity_Clear, Import_Opportunity_Error,
    Delete_Opportunity, Delete_Opportunity_Success, Delete_Opportunity_Clear,
    Add_Edit_Opportunity, Add_Edit_Opportunity_Success, Add_Edit_Opportunity_Clear,
} from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const importOpportunity = (data, token) => {
    return (dispatch) => {
        dispatch({ type: Import_Opportunity })
        fetch(`${BaseUrl}/import-opportunity`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                },
                body: data
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: Import_Opportunity_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
                dispatch({ type: Import_Opportunity_Error, payload: error })
            })
    }
};
export const addOpportunity = (data, token) => {
    return (dispatch) => {
        dispatch({ type: Add_Edit_Opportunity })
        fetch(`${BaseUrl}/opportunityAddEdit`,
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
export const deleteOpportunity = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: Delete_Opportunity })
        fetch(`${BaseUrl}/delete-Opportinity`,
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
        type: Import_Opportunity_Clear
    };
};