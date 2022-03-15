
import { VERIFY_OTP, LOGIN_CLEAR, RESEND_OTP, } from './actionTypes';
import BaseUrl from '../../../const'

export const resend = ( uid) => {
    // console.log(" credentails..................", uid)

    return (dispatch) => {
        dispatch({ type: RESEND_OTP })
        // {BaseUrl}//api/mobile/register

        fetch(`${BaseUrl}/resendotp`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    // 'Content-Type': "application/x-www-form-urlencoded",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: uid
                }),

            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("api response data ::::::::::::::::", responseData)
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


