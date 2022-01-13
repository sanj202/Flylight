import { REGISTER,FVERIFY_OTP, VERIFY_OTP ,GET_OTP } from '../Actions/actionTypes';

const initialState = {
    otp: [],
};
const FvarificationR = (state = initialState, action) => {
    switch (action.type) {
        case FVERIFY_OTP:
            return {
                ...state,
                otp: action.payload
            };
        default:
            return state;
    }
}
export default FvarificationR;






