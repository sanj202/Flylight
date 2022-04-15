
import {
    Invite_Member,Invite_Member_Success,Invite_Member_Clear,
    profileRole,profileRole_Success,profileRole_Clear,
    Get_Staff_Members,Staff_Members_Success,Staff_Members_Clear
} from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const Invitation = (data,token) => {
    return (dispatch) => {
        dispatch({ type: Invite_Member })
        fetch(`${BaseUrl}/InviteUser`,
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
                dispatch({ type: Invite_Member_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const ProfileRoleList = (data,token) => {
    return (dispatch) => {
        dispatch({ type: profileRole })
        fetch(`${BaseUrl}/getProfileRole`,
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
                dispatch({ type: profileRole_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const UserList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: Get_Staff_Members })
        fetch(`${Base_NodeUrl}/getUserList`,
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
                dispatch({ type: Staff_Members_Success, payload: responseData })
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
        type:Staff_Members_Clear,
    };
};