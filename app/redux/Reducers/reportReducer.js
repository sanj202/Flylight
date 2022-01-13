import { Get_Report } from '../Actions/actionTypes';

const initialState = {
    getReportList: [],
};
const reportR = (state = initialState, action) => {
    switch (action.type) {
        case Get_Report:
            return {
                ...state,
                getReportList: action.payload
            };
        default:
            return state;
    }
}
export default reportR;






