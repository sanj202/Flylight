
import { Dashboard,Dashboard_Success,Dashboard_Clear } from './actionTypes';
import BaseUrl from '../../../const'
export const dashboard = (uid, org_uid, profile_id, Token,) => {
    return (dispatch) => {
        dispatch({ type: Dashboard })
        fetch(`${BaseUrl}/v1/dashboard`,
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




export const clearResponse = () => {
    return {
        type: Dashboard_Clear,
    };
};


