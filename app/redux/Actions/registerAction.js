
import { REGISTER_SUCCESS ,REGISTER_CLEAR ,REGISTER ,} from './actionTypes';
import BaseUrl from '../../../const'

export const register = (data) => {
    return (dispatch) => {
        dispatch({ type: REGISTER })
        fetch(`${BaseUrl}/v1/register`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    // 'Content-Type': "application/x-www-form-urlencoded",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                console.log("api response data ::::::::::::::::", responseData)
                dispatch({ type: REGISTER_SUCCESS, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};




export const clearResponse = () => {
    return {
        type: REGISTER_CLEAR,
    };
};


