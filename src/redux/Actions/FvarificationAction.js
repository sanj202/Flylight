
import { FVERIFY_OTP, LOGIN_CLEAR, REGISTER, } from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const varification = (otp, uid) => {
    return (dispatch) => {
        dispatch({ type: FVERIFY_OTP })
        fetch(`${BaseUrl}/verify-forgot-password-otp`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    otp: otp,
                    email: uid
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: FVERIFY_OTP, payload: responseData })
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