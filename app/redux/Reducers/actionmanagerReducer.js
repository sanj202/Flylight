import {
    Add_Edit_Action, Add_Edit_Action_Success, Add_Edit_Action_Clear,
    Add_Edit_Status, Add_Edit_Status_Success, Add_Edit_Status_Clear,
    Get_Action, Action_Success, Action_Clear,
    Get_Status, Status_Success, Status_Clear
} from '../Actions/actionTypes';

const initialState = {
    addAction: [],
    addStatus: [],
    actionlist: [],
    statuslist: [],
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
        default:
            return state;
    }
}
export default actionR;






