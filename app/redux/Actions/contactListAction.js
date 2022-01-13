
import { Contact_List ,Contact_List_Suceess ,Contact_Clear ,Record_Feedback,Record_Feedback_Sucess,Record_Feedback_Clear}  from './actionTypes';
import BaseUrl from '../../../const'

export const contactList = (token,uid,profile_id,org_uid) => {
    // console.log(" credentails..................", token,uid,profile_id,org_uid )
    return (dispatch) => {
        dispatch({ type: Contact_List })

        fetch(`${BaseUrl}/v1/getContactList`,
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
                    // org_uid: org_uid,
                    // profile_id: profile_id,
                    uid: uid,
                    profile_id : profile_id,
                    org_uid : org_uid
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("contact APi response ::::::::::::::::", responseData)
                dispatch({ type: Contact_List_Suceess, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const AddEdit_feedback = (token,data) => {
    // console.log(" credentails..................", data)
    return (dispatch) => {
        dispatch({ type: Record_Feedback })
        fetch(`${BaseUrl}/v1/add-feedback`,
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
                // console.log("Record_Feedback .........::::::::::::::::", responseData)
                dispatch({ type: Record_Feedback_Sucess, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const clearResponse = () => {
    return {
        type: Contact_Clear,
    };
};
export const clearFeedbackResponse = () => {
    return {
        type: Record_Feedback_Clear,
    };
};


