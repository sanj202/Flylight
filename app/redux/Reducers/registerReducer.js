import { REGISTER, REGISTER_CLEAR, REGISTER_SUCCESS } from '../Actions/actionTypes';

const initialState = {
    data: [],
};
const registerR = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case REGISTER_CLEAR:
            return {
                ...state,
                data: []
            };
        default:
            return state;
    }
}
export default registerR;






