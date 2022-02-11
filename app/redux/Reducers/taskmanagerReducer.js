import {
    Get_Task_Todo_Done, Task_Todo_Done_Success, Task_Todo_Done_Clear,
    Add_Edit_Task, Add_Edit_Task_Success, Add_Edit_Task_Clear,
    Delete_Task, Delete_Task_Success, Delete_Task_Clear
} from '../Actions/actionTypes';

const initialState = {
    getList: [],
    addTask: [],
    deleteTask: [],
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
        default:
            return state;
    }
}
export default taskmanagerR;






