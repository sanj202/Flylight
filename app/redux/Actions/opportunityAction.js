
import {Import_Opportunity ,Add_Edit_Opportunity ,Get_Opportunity ,Opportunity_CLEAR} from './actionTypes';
import BaseUrl from '../../../const'

export const importOpportunity = (res, token, cProfile, org_id) => {
    // console.log(" credentails..................", res, token, cProfile, org_id)
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
                // console.log("importLead .........::::::::::::::::", responseData)
                dispatch({ type: Import_Opportunity, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};



export const addOpportunity = (data,token) => {
    // console.log(" credentails.Oppp.................",data,token  )
    return (dispatch) => {
        dispatch({ type: Add_Edit_Opportunity })

        fetch(`${BaseUrl}/v1/opportunityAddEdit`,
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
                // console.log("AddOpportunity .........::::::::::::::::", responseData)
                dispatch({ type: Add_Edit_Opportunity, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const OpportunityList = (token,uid,profile_id,org_uid) => {
    // console.log(" credentails..................",token,uid,profile_id,org_uid )
    return (dispatch) => {
        dispatch({ type: Get_Opportunity })

        fetch(`${BaseUrl}/v1/getOpportunityList`,
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
                    profile_id : profile_id,
                    // opportunity_id:profile_id,
                    org_uid : org_uid,
                 
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("listOpportunity .........::::::::::::::::", responseData)
                dispatch({ type: Get_Opportunity, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const clearResponse = () => {
    return {
        type: Opportunity_CLEAR,
    };
};


