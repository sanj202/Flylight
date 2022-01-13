import { SET_PASSWORD,RESEND_OTP, VERIFY_OTP ,GET_OTP } from '../Actions/actionTypes';

const initialState = {
    data: [],
};
const setPasswordR = (state = initialState, action) => {
    switch (action.type) {
        case SET_PASSWORD:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}
export default setPasswordR;






