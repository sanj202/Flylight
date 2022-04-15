
import { Get_Report,Report_Success,Report_Clear } from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const reportList = (data,token) => {
    return (dispatch) => {
        dispatch({ type: Get_Report })
        fetch(`${Base_NodeUrl}/leadReport`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: Report_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const clearResponse = () => {
    return {
        type: Report_Clear,
    };
};