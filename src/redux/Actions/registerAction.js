
import { REGISTER_SUCCESS ,REGISTER_CLEAR ,REGISTER ,} from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const register = (data) => {
    return (dispatch) => {
        dispatch({ type: REGISTER })
        fetch(`${BaseUrl}/register`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
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