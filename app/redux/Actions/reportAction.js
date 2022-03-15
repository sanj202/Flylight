
import { Get_Report,Report_Clear } from './actionTypes';
import BaseUrl from '../../../const'

export const reportList = (data,token) => {
    // console.log(" credentails..................",token,uid,profile_id,change )
    return (dispatch) => {
        dispatch({ type: Get_Report })

        fetch(`${BaseUrl}/index`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': "application/x-www-form-urlencoded",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("change TODO........::::::::::::::::", responseData)
                dispatch({ type: Get_Report, payload: responseData })
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


