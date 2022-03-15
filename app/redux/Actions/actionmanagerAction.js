import {
    Add_Edit_Action, Add_Edit_Action_Success, Add_Edit_Action_Clear,
    Add_Edit_Status, Add_Edit_Status_Success, Add_Edit_Status_Clear,
    Get_Action, Action_Success, Action_Clear,
    Get_Status, Status_Success, Status_Clear,
    Get_Action_Delete,Action_Delete_Success,Action_Delete_Clear,
    Get_Status_Delete,Status_Delete_Success,Status_Delete_Clear,

} from './actionTypes';
import BaseUrl from '../../../const'

export const add_EditStatus = (data,token) => {

    return (dispatch) => {
        dispatch({ type: Add_Edit_Status })
        fetch(`${BaseUrl}/addedit-status`,
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
                dispatch({ type: Add_Edit_Status_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const clearAddStatusResponse = () => {
    return {
        type: Add_Edit_Status_Clear,
    };
};

export const getStatus = (data,token) => {
    return (dispatch) => {
        dispatch({ type: Get_Status })
        fetch(`${BaseUrl}/status-list`,
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
                // console.log("response of get API......................",responseData)
                dispatch({ type: Status_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const clearStatusResponse = () => {
    return {
        type: Status_Clear,
    };
};

export const delete_Status = (data,token) => {

    return (dispatch) => {
        dispatch({ type: Get_Status_Delete })
        fetch(`${BaseUrl}/delete-status`,
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
                dispatch({ type: Status_Delete_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const clearDeleteStatusResponse = () => {
    return {
        type: Status_Delete_Clear,
    };
};

export const add_EditAction = (data ,token,) => {
    return (dispatch) => {
        dispatch({ type: Add_Edit_Action })
        fetch(`${BaseUrl}/addedit-action`,
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
                dispatch({ type: Add_Edit_Action_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const clearAddActionResponse = () => {
    return {
        type: Add_Edit_Action_Clear,
    };
};

export const getAction = (data,token) => {
    return (dispatch) => {
        dispatch({ type: Get_Action })
        fetch(`${BaseUrl}/action-list`,
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
                // console.log("response of get API......................",responseData)
                dispatch({ type: Action_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const clearActionResponse = () => {
    return {
        type: Action_Clear,
    };
};

export const delete_Action = (data,token) => {

    return (dispatch) => {
        dispatch({ type: Get_Action_Delete })
        fetch(`${BaseUrl}/delete-action`,
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
                dispatch({ type: Action_Delete_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const clearDeleteActionResponse = () => {
    return {
        type: Action_Delete_Clear,
    };
};

