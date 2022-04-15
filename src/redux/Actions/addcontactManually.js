import { Add_Contact_Manually_Success, Add_Contact_Manually_Clear, Add_Contact_Manually } from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'
export const M_addContact = (data ,Token) => {
    return (dispatch) => {
        dispatch({ type: Add_Contact_Manually })
        fetch(`${BaseUrl}/contactsAddEdit`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
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