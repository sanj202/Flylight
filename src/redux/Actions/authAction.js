
import { LOGIN, LOGIN_CLEAR, LOGIN_SUCCESS, } from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const login = (loginID, Password) => {
    return (dispatch) => {
        dispatch({ type: LOGIN })
        fetch(`${BaseUrl}/login`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: loginID,
                    password: Password
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: LOGIN_SUCCESS, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const varification = (otp, uid) => {
    return (dispatch) => {
        dispatch({ type: LOGIN })
        fetch(`${BaseUrl}/verifyotp`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    otp: otp,
                    uid: uid
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: LOGIN_SUCCESS, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const SwitchOrg = (post, profileId, OrgUid) => {
    return (dispatch) => {
        let postData = post;
        postData.data.cProfile = profileId;
        postData.data.org_uid = OrgUid;
        let responseData =
            Object.assign({}, { ...postData })
        dispatch({ type: LOGIN_SUCCESS, payload: responseData })
    }
};
export const clearResponse = () => {
    return {
        type: LOGIN_CLEAR,
    };
};