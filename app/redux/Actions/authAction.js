
import { LOGIN ,LOGIN_CLEAR ,LOGIN_SUCCESS ,} from './actionTypes';
import BaseUrl from '../../../const'

export const login = (loginID, Password) => {
    return (dispatch) => {
        dispatch({ type: LOGIN })
        fetch(`${BaseUrl}/v1/login`,
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




export const clearResponse = () => {
    return {
        type: LOGIN_CLEAR,
    };
};


