import { Dashboard, Dashboard_Success, Dashboard_Clear } from '../Actions/actionTypes';

const initialState = {
    data: [],
};
const dashboardR = (state = initialState, action) => {
    switch (action.type) {
        case Dashboard:
            return {
                ...state,
            };
        case Dashboard_Success:
            return {
                ...state,
                data: action.payload
            };
        case Dashboard_Clear:
            return {
                ...state,
                data: []
            };
        default:
            return state;
    }
}
export default dashboardR;






