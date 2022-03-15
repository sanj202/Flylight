

import { LOGIN, LOGIN_CLEAR, FGET_OTP, } from './actionTypes';
import BaseUrl from '../../../const'

export const forgotPassword = (loginID, Password) => {
    // console.log(" credentails..................", loginID)
    return (dispatch) => {
        dispatch({ type: FGET_OTP })
        // {BaseUrl}/api/mobile/login

        fetch(`${BaseUrl}/forgot-password`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    // 'Content-Type': "application/x-www-form-urlencoded",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginID,
                }),

            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("api response data ForgetPass::::::::::::::::", responseData)
                dispatch({ type: FGET_OTP, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })

    }
};