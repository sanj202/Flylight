
import {
    Invite_Member,Invite_Member_Success,Invite_Member_Clear,
    profileRole,profileRole_Success,profileRole_Clear
} from './actionTypes';
import BaseUrl from '../../../const'

export const Invitation = (data,token) => {
    return (dispatch) => {
        dispatch({ type: Invite_Member })
        fetch(`${BaseUrl}/v1/InviteUser`,
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
                dispatch({ type: Invite_Member_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    
    }
};

export const ProfileRoleList = (data,token) => {

    // console.log(data,token)
    return (dispatch) => {
        dispatch({ type: profileRole })
        fetch(`${BaseUrl}/v1/getProfileRole`,
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
                dispatch({ type: profileRole_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    
    }
};


export const clearResponse = () => {
    return {
        type: Invite_Member_Clear,
        type: profileRole_Clear,
    };
};


