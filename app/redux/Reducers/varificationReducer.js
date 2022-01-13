import { REGISTER,LOGIN, VERIFY_OTP ,GET_OTP } from '../Actions/actionTypes';

const initialState = {
    otp: [],
};
const varificationR = (state = initialState, action) => {
    switch (action.type) {
        case VERIFY_OTP:
            return {
                ...state,
                otp: action.payload
            };
        default:
            return state;
    }
}
export default varificationR;






