
import { LOGIN, LOGIN_CLEAR ,FGET_OTP } from '../Actions/actionTypes';
const initialState = {
    data: [],
};
const forgotPasswordR = (state = initialState, action) => {
    switch (action.type) {
        case FGET_OTP:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}
export default forgotPasswordR;