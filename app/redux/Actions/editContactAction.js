



import { Edit_Contact ,Edit_Contact_Suceess,Edit_Contact_Clear} from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const EditContact = (data ,Token) => {
    // console.log(" credentails..................", data ,Token)
    return (dispatch) => {
        dispatch({ type: Edit_Contact })
        // {BaseUrl}/api/mobile/login

        fetch(`${BaseUrl}/contactsAddEdit`,
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
                // console.log("Edit_Contact::::::::::::::::", responseData)
                dispatch({ type: Edit_Contact_Suceess, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }

};




export const clearResponse = () => {
    return {
        type: Edit_Contact_Clear,
    };
};


