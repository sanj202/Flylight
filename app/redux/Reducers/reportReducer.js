import { Get_Report, Report_Success, Report_Clear } from '../Actions/actionTypes';

const initialState = {
    getReportList: [],
};
const reportR = (state = initialState, action) => {
    switch (action.type) {
        case Get_Report:
            return {
                ...state,
            };
        case Report_Success:
            return {
                ...state,
                getReportList: action.payload
            };
        case Report_Clear:
            return {
                ...state,
                getReportList: []
            };
        default:
            return state;
    }
}
export default reportR;






