
import { VERIFY_OTP, LOGIN_CLEAR, RESEND_OTP, } from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const resend = ( uid) => {
    return (dispatch) => {
        dispatch({ type: RESEND_OTP })
        fetch(`${BaseUrl}/resendotp`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid: uid}),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: RESEND_OTP, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const clearResponse = () => {
    return {
        type: LOGIN_CLEAR,
    };
};