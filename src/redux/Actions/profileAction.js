
import { Get_Profile ,Profile_Suceess,Profile_Clear,
         Edit_ProfileImage,Edit_ProfileImage_Suceess,
         Edit_ProfileImage_Clear,Edit_ProfileImage_Error,
         Permissions,Permissions_Success,Permissions_Clear } from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'
export const profile = (data, Token,) => {
    return (dispatch) => {
        dispatch({ type: Get_Profile })
        fetch(`${BaseUrl}/getUser`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: Profile_Suceess, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const updateAvatar =  (data, token) => {
    return (dispatch) => {
        dispatch({ type: Edit_ProfileImage })
        fetch(`${BaseUrl}/updateAvatar`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                },
                body: data,
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type:Edit_ProfileImage_Suceess, payload: responseData })
            })
            .catch((error) => {
                dispatch({ type:Edit_ProfileImage_Error, payload: error })
                console.log("error" + error);
            })
    }
};
export const GetPermission = (data, Token,) => {
    return (dispatch) => {
        dispatch({ type: Permissions })
        fetch(`${Base_NodeUrl}/getPermissions`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                console.log('.....................',responseData)
                // dispatch({ type: Permissions_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const clearResponse = () => {
    return {
        type: Profile_Clear,
    };
};
export const clearprofileImageResponse = () => {
    return {
        type: Edit_ProfileImage_Clear,
    };
};