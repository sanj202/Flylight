import {
    Organization_List, Organization_List_Clear, Organization_List_Success,
    packegeTopups, packegeTopups_Success, packegeTopups_Clear,
    packegeTopups_history, packegeTopups_history_Success, packegeTopups_history_Clear,
    Package_Order, Package_Order_Success, Package_Order_Clear,
    Package_Order_Verify, Package_Order_Verify_Success, Package_Order_Verify_Clear,
    TopUp_Order, TopUp_Order_Success, TopUp_Order_Clear,
    TopUp_Order_Verify, TopUp_Order_Verify_Success, TopUp_Order_Verify_Clear
} from '../Actions/actionTypes';
const initialState = {
    getList: [],
    getpack: [],
    getpackHistory: [],
    getpackOrder: [],
    verifypackorder: [],
    gettopOrder: [],
    verifytoporder: []
};
const OrganizationR = (state = initialState, action) => {
    switch (action.type) {
        case Organization_List:
            return {
                ...state,
            };
        case Organization_List_Success:
            return {
                ...state,
                getList: action.payload
            };
        case Organization_List_Clear:
            return {
                ...state,
                getList: []
            };

        case packegeTopups:
            return {
                ...state,
            };
        case packegeTopups_Success:
            return {
                ...state,
                getpack: action.payload
            };
        case packegeTopups_Clear:
            return {
                ...state,
                getpack: []
            };

        case packegeTopups_history:
            return {
                ...state,
            };
        case packegeTopups_history_Success:
            return {
                ...state,
                getpackHistory: action.payload
            };
        case packegeTopups_history_Clear:
            return {
                ...state,
                getpackHistory: []
            };

        case Package_Order:
            return {
                ...state,
            };
        case Package_Order_Success:
            return {
                ...state,
                getpackOrder: action.payload
            };
        case Package_Order_Clear:
            return {
                ...state,
                getpackOrder: []
            };

        case Package_Order_Verify:
            return {
                ...state,
            };
        case Package_Order_Verify_Success:
            return {
                ...state,
                verifypackorder: action.payload
            };
        case Package_Order_Verify_Clear:
            return {
                ...state,
                verifypackorder: []
            };
        case TopUp_Order:
            return {
                ...state,
            };
        case TopUp_Order_Success:
            return {
                ...state,
                gettopOrder: action.payload
            };
        case TopUp_Order_Clear:
            return {
                ...state,
                gettopOrder: []
            };
        case TopUp_Order_Verify:
            return {
                ...state,
            };
        case TopUp_Order_Verify_Success:
            return {
                ...state,
                verifytoporder: action.payload
            };
        case TopUp_Order_Verify_Clear:
            return {
                ...state,
                verifypackorder: []
            };
        default:
            return state;
    }
}
export default OrganizationR;