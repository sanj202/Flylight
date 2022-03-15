
import { Dashboard,Dashboard_Success,Dashboard_Clear,
         Update_Token,Update_Token_Success,Update_Token_Clear } from './actionTypes';
import BaseUrl from '../../../const'
export const dashboard = (uid, org_uid, profile_id, Token,) => {
    return (dispatch) => {
        dispatch({ type: Dashboard })
        fetch(`${BaseUrl}/dashboard`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Token,
                },
                body: JSON.stringify({
                    uid: uid,
                    org_uid: org_uid,
                    profile_id: profile_id
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: Dashboard_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const UpdateToken = (uid,fcmtoken,Token) => {
    return (dispatch) => {
        dispatch({ type: Update_Token })
        fetch(`${BaseUrl}/updatefcmToken`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Token,
                },
                body: JSON.stringify({
                    uid: uid,
                    fcm:fcmtoken
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("fcm updaste...............",responseData)
                dispatch({ type: Update_Token_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const clearResponse = () => {
    return {
        type: Dashboard_Clear,
        type: Update_Token_Clear
    };
};


