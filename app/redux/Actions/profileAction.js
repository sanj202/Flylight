
import { Get_Profile ,Profile_Suceess,Profile_Clear } from './actionTypes';
import BaseUrl from '../../../const'

export const profile = (uid, org_uid, profile_id, Token,) => {
    // console.log("dashboard credentails..................", uid, org_uid, profile_id ,Token ,)
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

                body: JSON.stringify({
                    uid: uid,
                    org_uid: org_uid,
                    profile_id: profile_id
                }),

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


export const clearResponse = () => {
    return {
        type: Profile_Clear,
    };
};


