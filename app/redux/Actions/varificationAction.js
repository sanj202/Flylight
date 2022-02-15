
import { VERIFY_OTP,VERIFY_OTP_CLEAR,VERIFY_OTP_SUCCESS } from './actionTypes';
import BaseUrl from '../../../const'

export const varification = (otp, uid) => {
    return (dispatch) => {
        dispatch({ type: VERIFY_OTP })
        fetch(`${BaseUrl}/v1/verifyotp`,
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
                dispatch({ type: VERIFY_OTP_SUCCESS, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const SwitchOrg = (post, profileId, OrgUid) => {
    // console.log('profileId, OrgUidprofileId, OrgUid',profileId, OrgUid)
    return (dispatch) => {
        let postData = post;
        postData.data.cProfile = profileId;
        postData.data.org_uid = OrgUid;
        let responseData =
            Object.assign({}, { ...postData })
        console.log('responseDatta..........................',responseData)
        dispatch({ type: VERIFY_OTP_SUCCESS, payload: responseData })
    }
};

export const clearResponse = () => {
    return {
        type: VERIFY_OTP_CLEAR,
    };
};


