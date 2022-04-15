
import {Dashboard_Chart, Dashboard_Chart_Success, Dashboard_Chart_Clear,
    Update_Token, Update_Token_Success, Update_Token_Clear} from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const dashboardCount = (uid, org_uid, profile_id, Token,days) => {
    return (dispatch) => {
        dispatch({ type: Dashboard_Chart })
        fetch(`${Base_NodeUrl}/leadChart`,
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
                    profile_id: profile_id,
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: Dashboard_Chart_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const UpdateToken = (uid, fcmtoken, Token) => {
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
                    fcm: fcmtoken
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: Update_Token_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const clearResponse = () => {
    return {
        type: Update_Token_Clear,
        type: Dashboard_Chart_Clear
    };
};