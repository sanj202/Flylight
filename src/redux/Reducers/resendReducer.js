import { REGISTER,RESEND_OTP, VERIFY_OTP ,GET_OTP } from '../Actions/actionTypes';
const initialState = {
    otpResend: [],
};
const resendR = (state = initialState, action) => {
    switch (action.type) {
        case RESEND_OTP:
            return {
                ...state,
                otpResend: action.payload
            };
        default:
            return state;
    }
}
export default resendR;