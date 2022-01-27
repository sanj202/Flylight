
import { Get_Profile ,Profile_Suceess,Profile_Clear,
         Edit_ProfileImage,Edit_ProfileImage_Suceess,Edit_ProfileImage_Clear } from './actionTypes';
import BaseUrl from '../../../const'

export const profile = (data, Token,) => {
    return (dispatch) => {
        dispatch({ type: Get_Profile })
        fetch(`${BaseUrl}/v1/getUser`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': "application/x-www-form-urlencoded",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Token,
                   
                },

                body: JSON.stringify(data),

            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("api response data ::::::::::::::::", responseData)
                dispatch({ type: Profile_Suceess, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const updateAvatar = (formdata , Token,) => {
    console.log("av..............................",formdata)
    return (dispatch) => {
        dispatch({ type: Edit_ProfileImage })
        fetch(`${BaseUrl}/v1/updateAvatar`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    // 'Content-Type': "application/x-www-form-urlencoded",
                    // 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Token,
                },
                // body: JSON.stringify(formdata,data),
                body: formdata,
            })
            .then(response => response.json())
            .then(responseData => {
                console.log("api response data ::::::::::::::::", responseData)
                // dispatch({ type:Edit_ProfileImage_Suceess, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const clearResponse = () => {
    return {
        type: Profile_Clear,
        type: Edit_ProfileImage_Clear,
    };
};


