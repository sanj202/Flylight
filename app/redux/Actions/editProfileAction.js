
import {  Edit_Profile ,Edit_Profile_Suceess,Edit_Profile_Clear } from './actionTypes';
import BaseUrl from '../../../const'

export const Eprofile = (
    uid,
    org_uid,
    profile_id,
    Token,
    first_name,
    last_name,
    phone,
    dob,
    street,
    city,
    state,
    zip,
    country
) => {
    return (dispatch) => {
        dispatch({ type: Edit_Profile })

        fetch(`${BaseUrl}/v1/UpdateProfile`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': "application/x-www-form-urlencoded",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Token,
                },

                body: JSON.stringify({
                    first_name: first_name,
                    last_name: last_name,
                    phone: phone,
                    dob: dob,
                    street: street,
                    city: city,
                    state: state,
                    zip: zip,
                    country: country,
                    uid: uid,
                    org_uid: org_uid,
                    profile_id: profile_id
                }),

            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("api response data ::::::::::::::::", responseData)
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


