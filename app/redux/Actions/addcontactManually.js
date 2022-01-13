



import { Add_Contact_Manually_Success, Add_Contact_Manually_Clear, Add_Contact_Manually } from './actionTypes';
import BaseUrl from '../../../const'

export const M_addContact = (data ,Token) => {
    // console.log(" credentails..................", data ,Token)
    return (dispatch) => {
        dispatch({ type: Add_Contact_Manually })
        // {BaseUrl}/api/mobile/login
        fetch(`${BaseUrl}/v1/contactsAddEdit`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    // 'Content-Type': "application/x-www-form-urlencoded",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Token,
                },
                body: JSON.stringify(data),

            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("api response data ::::::::::::::::", responseData)
                dispatch({ type: Add_Contact_Manually_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }

};





export const clearResponse = () => {
    return {
        type: Add_Contact_Manually_Clear,
    };
};


