
import {
    Meeting, Meeting_Success, Meeting_Clear,
    Meeting_Detail,Meeting_Detail_Success,Meeting_Detail_Clear,
    Add_Edit_Meeting, Add_Edit_Meeting_Success, Add_Edit_Meeting_Clear,
    MeetingLeads,MeetingLeads_Success,MeetingContact_Clear,
    MeetingContact,MeetingContact_Success,MeetingLeads_Clear
} from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const add_Edit_Meeting = (data, token) => {
    return (dispatch) => {
        dispatch({ type: Add_Edit_Meeting })
        fetch(`${BaseUrl}/addEditMeeting`,
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
                dispatch({ type: Add_Edit_Meeting_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const MeetingList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: Meeting })
        fetch(`${BaseUrl}/getmeetingList`,
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
                dispatch({ type: Meeting_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const MeetingOne = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: Meeting_Detail })
        fetch(`${BaseUrl}/getMeeting`,
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
                dispatch({ type: Meeting_Detail_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const  MeetingleadList = (data, token) => {
    return (dispatch) => {
        dispatch({ type: MeetingLeads })
        fetch(`${BaseUrl}/getleadsList`,
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
                dispatch({ type: MeetingLeads_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const MeetingcontactList = (data,token) => {
    return (dispatch) => {
        dispatch({ type: MeetingContact })
        fetch(`${BaseUrl}/getContactList`,
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
                dispatch({ type: MeetingContact_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const clearResponse = () => {
    return {
        type: Add_Edit_Meeting_Clear,
        type: Meeting_Clear,
        type: Meeting_Detail_Clear,
        type: MeetingLeads_Clear,
        type: MeetingContact_Clear
    };
};