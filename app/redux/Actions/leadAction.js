
import { Import_Lead, Add_Edit_Lead, Get_Lead, Lead_CLEAR } from './actionTypes';
import BaseUrl from '../../../const'


export const importLead = (res, token, cProfile, org_id) => {
    // console.log(" credentails..................", res, token, cProfile, org_id)
    return (dispatch) => {
        dispatch({ type: Import_Lead })

        fetch(`${BaseUrl}/v1/import-lead`,
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
                // console.log("importLead .........::::::::::::::::", responseData)
                dispatch({ type: Import_Lead, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const addLaed = (data, token) => {
    // console.log(" credentails..................", data, token)
    return (dispatch) => {
        dispatch({ type: Add_Edit_Lead })

        fetch(`${BaseUrl}/v1/leadsAddEdit`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': "application/x-www-form-urlencoded",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    // 'Authorization': uid,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("AddLead .........::::::::::::::::", responseData)
                dispatch({ type: Add_Edit_Lead, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};



export const leadList = (token, uid, profile_id, org_uid) => {
    // console.log(" credentails..................",token,uid,profile_id,org_uid )
    return (dispatch) => {
        dispatch({ type: Get_Lead })

        fetch(`${BaseUrl}/v1/getleadsList`,
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
                    uid: uid,
                    profile_id: profile_id,
                    org_uid: org_uid
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("listLead .........::::::::::::::::", responseData)
                dispatch({ type: Get_Lead, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const clearResponse = () => {
    return {
        type: Lead_CLEAR,
    };
};


