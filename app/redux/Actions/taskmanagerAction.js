
import {
    Get_Task_Todo_Done,Task_Todo_Done_Success,Task_Todo_Done_Clear,
    Add_Edit_Task, Add_Edit_Task_Success, Add_Edit_Task_Clear,
    Delete_Task,Delete_Task_Success,Delete_Task_Clear
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
    // console.log(" credentails..................",token,uid,profile_id,change )
    return (dispatch) => {
        dispatch({ type: Get_Task_Todo_Done })

        fetch(`${BaseUrl}/v1/task-list`,
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


export const clearResponse = () => {
    return {
        type: Task_Todo_Done_Clear,
        type : Add_Edit_Task_Clear,
        type : Delete_Task_Clear
    };
};


