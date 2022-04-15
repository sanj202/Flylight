
import { VERIFY_OTP, LOGIN_CLEAR, RESEND_OTP,SET_PASSWORD } from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const setPassword = (email, state ,state1) => {
    return (dispatch) => {
        dispatch({ type: SET_PASSWORD })
        fetch(`${BaseUrl}/reset-password`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: state,
                    confirm_password: state1
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: SET_PASSWORD, payload: responseData })
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