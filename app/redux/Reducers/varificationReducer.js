import {VERIFY_OTP, VERIFY_OTP_SUCCESS, VERIFY_OTP_CLEAR } from '../Actions/actionTypes';

const initialState = {
    otp: [],
};
const varificationR = (state = initialState, action) => {
    switch (action.type) {
        case VERIFY_OTP:
            return {
                ...state,
            };
            case VERIFY_OTP_SUCCESS:
                return {
                    ...state,
                    otp: action.payload
                };
        case VERIFY_OTP_CLEAR:
            return {
                ...state,
                otp: []
            };
        default:
            return state;
    }
}
export default varificationR;






