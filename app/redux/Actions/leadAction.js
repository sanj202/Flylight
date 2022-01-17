
import { 
    Import_Lead,
     Add_Edit_Lead,Add_Edit_Lead_Success,Add_Edit_Lead_Clear,
     LeadOwner,LeadOwner_Success,LeadOwner_Clear } from './actionTypes';
import BaseUrl from '../../../const'

export const addLaed = (data, token) => {
    return (dispatch) => {
        dispatch({ type: Add_Edit_Lead })
        fetch(`${BaseUrl}/v1/leadsAddEdit`,
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
                dispatch({ type: Add_Edit_Lead_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const LeadOwnerList = (uid ,org_uid, profile_id,token,) => {
    return (dispatch) => {
        dispatch({ type: LeadOwner })
        fetch(`${BaseUrl}/v1/getOrgUserList`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    uid: uid,
                    profile_id: profile_id,
                    org_uid: org_uid
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: LeadOwner_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const importLead = (res, token, cProfile, org_id) => {
    return (dispatch) => {
        dispatch({ type: Import_Lead })
        fetch(`${BaseUrl}/v1/import-lead`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    CSVFILE: res,
                    orgid: org_id,
                    profile_id: cProfile
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: Import_Lead, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const clearResponse = () => {
    return {
        type:Add_Edit_Lead_Clear,
        type:LeadOwner_Clear,
    };
};






