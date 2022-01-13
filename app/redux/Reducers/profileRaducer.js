import { Get_Profile, Profile_Suceess,Profile_Clear } from '../Actions/actionTypes';

const initialState = {
    userDetail: [],
};
const profileR = (state = initialState, action) => {
    switch (action.type) {
        case Get_Profile:
            return {
                ...state,
            };
        case Profile_Suceess:
            return {
                ...state,
                userDetail: action.payload
            };
        case Profile_Clear:
            return {
                ...state,
                userDetail: []
            };
        default:
            return state;
    }
}
export default profileR;






