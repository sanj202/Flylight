import {
    Update_Token, Update_Token_Success, Update_Token_Clear,
    Dashboard_Chart_Success, Dashboard_Chart_Clear, Dashboard_Chart
} from '../Actions/actionTypes';
const initialState = {
    tokenData: [],
    count: []
};
const dashboardR = (state = initialState, action) => {
    switch (action.type) {
        case Dashboard_Chart:
            return {
                ...state,
            };
        case Dashboard_Chart_Success:
            return {
                ...state,
                count: action.payload
            };
        case Dashboard_Chart_Clear:
            return {
                count: []
            };
        case Update_Token:
            return {
                ...state,
            };
        case Update_Token_Success:
            return {
                ...state,
                tokenData: action.payload
            };
        case Update_Token_Clear:
            return {
                tokenData: []
            };
        default:
            return state;
    }
}
export default dashboardR;