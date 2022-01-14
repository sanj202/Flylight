
import {  Edit_Profile ,Edit_Profile_Suceess,Edit_Profile_Clear } from './actionTypes';
import BaseUrl from '../../../const'

export const Eprofile = (data,token)=> {
    return (dispatch) => {
        dispatch({ type: Edit_Profile })

        fetch(`${BaseUrl}/v1/UpdateProfile`,
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
                dispatch({ type: Edit_Profile_Suceess, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};




export const clearResponse = () => {
    return {
        type: Edit_Profile_Clear,
    };
};


