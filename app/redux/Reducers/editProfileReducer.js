import { Edit_Profile, Edit_Profile_Suceess, Edit_Profile_Clear } from '../Actions/actionTypes';

const initialState = {
    userUpdatedDetail: [],
};
const EprofileR = (state = initialState, action) => {
    switch (action.type) {
        case Edit_Profile:
            return {
                ...state,
            };
        case Edit_Profile_Suceess:
            return {
                ...state,
                userUpdatedDetail: action.payload
            };
        case Edit_Profile_Clear:
            return {
                ...state,
                userUpdatedDetail: [],
            };
        default:
            return state;
    }
}
export default EprofileR;






