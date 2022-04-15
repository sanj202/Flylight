import {
    Get_Task_Todo_Done, Task_Todo_Done_Success, Task_Todo_Done_Clear,
    Add_Edit_Task, Add_Edit_Task_Success, Add_Edit_Task_Clear,
    Delete_Task, Delete_Task_Success, Delete_Task_Clear,
    TaskOwner, TaskOwner_Success, TaskOwner_Clear,
    TaskContact, TaskContact_Success, TaskContact_Clear,
    TaskLeads, TaskLeads_Success, TaskLeads_Clear,
    TaskStatus, TaskStatus_Success, TaskStatus_Clear
} from '../Actions/actionTypes';
const initialState = {
    getList: [],
    addTask: [],
    deleteTask: [],
    taskOwner: [],
    tasklead: [],
    taskcontact: [],
    taskstatus: []
};
const taskmanagerR = (state = initialState, action) => {
    switch (action.type) {

        case Get_Task_Todo_Done:
            return {
                ...state,
            };
        case Task_Todo_Done_Success:
            return {
                ...state,
                getList: action.payload
            };
        case Task_Todo_Done_Clear:
            return {
                ...state,
                getList: []
            };
        case Add_Edit_Task:
            return {
                ...state,
            };
        case Add_Edit_Task_Success:
            return {
                ...state,
                addTask: action.payload
            };
        case Add_Edit_Task_Clear:
            return {
                ...state,
                addTask: []
            };
        case Delete_Task:
            return {
                ...state,
            };
        case Delete_Task_Success:
            return {
                ...state,
                deleteTask: action.payload
            };
        case Delete_Task_Clear:
            return {
                ...state,
                deleteTask: []
            };
        case TaskOwner:
            return {
                ...state
            }
        case TaskOwner_Success:
            return {
                taskOwner: action.payload
            }
        case TaskOwner_Clear:
            return {
                taskOwner: []
            }
        case TaskContact:
            return {
                ...state
            }
        case TaskContact_Success:
            return {
                taskcontact: action.payload
            }
        case TaskContact_Clear:
            return {
                taskcontact: []
            }
        case TaskLeads:
            return {
                ...state
            }
        case TaskLeads_Success:
            return {
                tasklead: action.payload
            }
        case TaskLeads_Clear:
            return {
                tasklead: []
            }
        case TaskStatus:
            return {
                ...state
            }
        case TaskStatus_Success:
            return {
                taskstatus: action.payload
            }
        case TaskStatus_Clear:
            return {
                taskstatus: []
            }
        default:
            return state;
    }
}
export default taskmanagerR;