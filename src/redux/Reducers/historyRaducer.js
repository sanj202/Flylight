import {
    Add_callhistory, Add_callhistory_Success, Add_callhistory_Clear,
    callhistory, callhistory_Success, callhistory_Clear,
    Campaign, Campaign_Success, Campaign_Clear,
    lead_status, lead_status_Success, lead_status_Clear,
    historyDetail, historyDetail_Success, historyDetail_Clear
} from '../Actions/actionTypes';
const initialState = {
    getHistory: [],
    campData: [],
    leadData: [],
    detailHistory: []
};
const historyR = (state = initialState, action) => {
    switch (action.type) {
        case callhistory:
            return {
                ...state,
            };
        case callhistory_Success:
            return {
                ...state,
                getHistory: action.payload,
            };
        case callhistory_Clear:
            return {
                getHistory: [],
            };
        case Campaign:
            return {
                ...state,
            };
        case Campaign_Success:
            return {
                ...state,
                campData: action.payload,
            };
        case Campaign_Clear:
            return {
                campData: [],
            };
        case lead_status:
            return {
                ...state,
            };
        case lead_status_Success:
            return {
                ...state,
                leadData: action.payload,
            };
        case lead_status_Clear:
            return {
                leadData: [],
            };
        case historyDetail:
            return {
                ...state,
            };
        case historyDetail_Success:
            return {
                ...state,
                detailHistory: action.payload,
            };
        case historyDetail_Clear:
            return {
                detailHistory: [],
            };

        default:
            return state;
    }
}
export default historyR;