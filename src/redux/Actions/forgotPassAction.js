

import { LOGIN, LOGIN_CLEAR, FGET_OTP, } from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const forgotPassword = (loginID, Password) => {
    return (dispatch) => {
        dispatch({ type: FGET_OTP })
        fetch(`${BaseUrl}/forgot-password`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginID,
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: FGET_OTP, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};