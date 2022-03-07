
import {
    Get_Task_Todo_Done, Task_Todo_Done_Success, Task_Todo_Done_Clear,
    Add_Edit_Task, Add_Edit_Task_Success, Add_Edit_Task_Clear,
    Delete_Task, Delete_Task_Success, Delete_Task_Clear,
    TaskOwner, TaskOwner_Success, TaskOwner_Clear,
    TaskContact, TaskContact_Success, TaskContact_Clear,
    TaskLeads, TaskLeads_Success, TaskLeads_Clear,
    TaskStatus, TaskStatus_Success, TaskStatus_Clear
} from './actionTypes';
import BaseUrl from '../../../const'

export const Add_EditTask = (data, token) => {
    return (dispatch) => {
        dispatch({ type: Add_Edit_Task })
        fetch(`${BaseUrl}/v1/TaskAddEdit`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': "application/x-www-form-urlencoded",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    // 'Authorization': uid,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("AddLead .........::::::::::::::::", responseData)
                dispatch({ type: Add_Edit_Task_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};



export const TaskList = (data, token,) => {
    console.log(" credentails..................", token, data)
    return (dispatch) => {
        dispatch({ type: Get_Task_Todo_Done })

        fetch(`http://3.23.113.168:3000/postTaskList`,
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
                // console.log("change TODO........::::::::::::::::", responseData)
                dispatch({ type: Task_Todo_Done_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const deleteTask = (data, token,) => {
    // console.log(" credentails..................", res, token, cProfile, change)
    return (dispatch) => {
        dispatch({ type: Delete_Task })
        fetch(`${BaseUrl}/v1/delete-task`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': "application/x-www-form-urlencoded",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    // 'Authorization': uid,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("importLead .........::::::::::::::::", responseData)
                dispatch({ type: Delete_Task_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const TaskOwnerList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: TaskOwner })
        fetch(`${BaseUrl}/v1/getOrgUserList`,
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
                dispatch({ type: TaskOwner_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const TaskleadList = (data, token) => {
    return (dispatch) => {
        dispatch({ type: TaskLeads })
        fetch(`${BaseUrl}/v1/getleadsList`,
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
                dispatch({ type: TaskLeads_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const TaskcontactList = (data, token) => {
    // console.log(" credentails..................", token,uid,profile_id,org_uid )
    return (dispatch) => {
        dispatch({ type: TaskContact })

        fetch(`${BaseUrl}/v1/getContactList`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': "application/x-www-form-urlencoded",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    // 'Authorization': uid,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("contact APi response ::::::::::::::::", responseData)
                dispatch({ type: TaskContact_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const TaskStatusList = (data, token) => {
    return (dispatch) => {
        dispatch({ type: TaskStatus })
        fetch(`${BaseUrl}/v1/task-status`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': "application/x-www-form-urlencoded",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    // 'Authorization': uid,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("AddLead .........::::::::::::::::", responseData)
                dispatch({ type: TaskStatus_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const clearResponse = () => {
    return {
        type: Task_Todo_Done_Clear,
        type: Add_Edit_Task_Clear,
        type: Delete_Task_Clear,
        type: TaskOwner_Clear,
        type: TaskLeads_Clear,
        type: TaskContact_Clear,
        type: TaskStatus_Clear

    };
};


