import { Get_History, History_Success, History_Clear, History_Feedback, History_Feedback_Success, History_Feedback_Clear } from '../Actions/actionTypes';

const initialState = {
    getHistoryList: [],
    feedback: []
};
const historyR = (state = initialState, action) => {
    switch (action.type) {
        case Get_History:
            return {
                ...state,
            };
        case History_Success:
            return {
                ...state,
                getHistoryList: action.payload
            };
        case History_Clear:
            return {
                ...state,
                getHistoryList: []
            };
        case History_Feedback:
            return {
                ...state,
            };
        case History_Feedback_Success:
            return {
                ...state,
                feedback: action.payload
            };
        case History_Feedback_Clear:
            return {
                ...state,
                feedback: []
            };
        default:
            return state;
    }
}
export default historyR;






