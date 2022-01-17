
import { Get_History ,History_Success,History_Clear ,
    History_Feedback,History_Feedback_Success,History_Feedback_Clear } from './actionTypes';
import BaseUrl from '../../../const'

export const AddEdit_feedback_History = (token,data) => {
    // console.log(" credentails..................", data)
    return (dispatch) => {
        dispatch({ type: History_Feedback })
        fetch(`${BaseUrl}/v1/addedit-historyfeedback`,
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
                // console.log("History_Feedback .........::::::::::::::::", responseData)
                dispatch({ type: History_Feedback_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const clearHistoryFeedbackResponse = () => {
    return {
        type: History_Feedback_Clear,
    };
};

export const historyList = (token, uid, profile_id, org_id ,org_uid) => {
    // console.log(" credentails..................",token,uid,profile_id,org_id )
    return (dispatch) => {
        dispatch({ type: Get_History })
        fetch(`${BaseUrl}/v1/history`,
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
                    orgId : org_id,
                    org_uid : org_uid
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                console.log("History.......::::::::::::::::", responseData)
                dispatch({ type: History_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const clearResponse = () => {
    return {
        type: History_Clear,
    };
};




