import {
    Add_Edit_Action, Add_Edit_Action_Success, Add_Edit_Action_Clear,
    Add_Edit_Status, Add_Edit_Status_Success, Add_Edit_Status_Clear,
    Get_Action, Action_Success, Action_Clear,
    Get_Status, Status_Success, Status_Clear,
    Get_Action_Delete, Action_Delete_Success, Action_Delete_Clear,
    Get_Status_Delete, Status_Delete_Success, Status_Delete_Clear,
} from '../Actions/actionTypes';

const initialState = {
    addAction: [],
    addStatus: [],
    actionlist: [],
    statuslist: [],
    deleteAction: [],
    deleteStatus: [],
};
const actionR = (state = initialState, action) => {
    switch (action.type) {
        case Add_Edit_Action:
            return {
                ...state,
            };
        case Add_Edit_Action_Success:
            return {
                ...state,
                addAction: action.payload
            };
        case Add_Edit_Action_Clear:
            return {
                ...state,
                addAction: [],
            }
        case Add_Edit_Status:
            return {
                ...state,
            };

        case Add_Edit_Status_Success:
            return {
                ...state,
                addStatus: action.payload
            };
        case Add_Edit_Status_Clear:
            return {
                ...state,
                addStatus: [],
            }
        case Get_Action:
            return {
                ...state,
            };

        case Action_Success:
            return {
                ...state,
                actionlist: action.payload
            };
        case Action_Clear:
            return {
                ...state,
                actionlist: [],
            }
        case Get_Status:
            return {
                ...state,
            };

        case Status_Success:
            return {
                ...state,
                statuslist: action.payload
            };
        case Status_Clear:
            return {
                ...state,
                statuslist: [],
            }

        case Get_Action_Delete:
            return {
                ...state,
            };

        case Action_Delete_Success:
            return {
                ...state,
                deleteAction: action.payload
            };
        case Action_Delete_Clear:
            return {
                ...state,
                deleteAction: [],
            }

        case Get_Status_Delete:
            return {
                ...state,
            };

        case Status_Delete_Success:
            return {
                ...state,
                deleteStatus: action.payload
            };
        case Status_Delete_Clear:
            return {
                ...state,
                deleteStatus: [],
            }
        default:
            return state;
    }
}
export default actionR;






