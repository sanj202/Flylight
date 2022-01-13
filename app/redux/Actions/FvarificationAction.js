
import { FVERIFY_OTP, LOGIN_CLEAR, REGISTER, } from './actionTypes';
import BaseUrl from '../../../const'

export const varification = (otp, uid) => {
    // console.log(" credentails................./.",     otp,uid)

    return (dispatch) => {
        dispatch({ type: FVERIFY_OTP })
        // {BaseUrl}//api/mobile/register

        fetch(`${BaseUrl}/v1/verify-forgot-password-otp`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    // 'Content-Type': "application/x-www-form-urlencoded",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    otp: otp,
                    email: uid
                }),

            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("api response data ::::FVERIFY_OTP::::::::::::", responseData)
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


