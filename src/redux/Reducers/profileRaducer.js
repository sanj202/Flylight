import {
    Get_Profile, Profile_Suceess, Profile_Clear,
    Edit_ProfileImage, Edit_ProfileImage_Suceess, Edit_ProfileImage_Clear, Edit_ProfileImage_Error,
    Permissions, Permissions_Success, Permissions_Clear
} from '../Actions/actionTypes';
const initialState = {
    userDetail: [],
    userImage: [],
    permission: []
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
        case Edit_ProfileImage:
            return {
                ...state
            }
        case Edit_ProfileImage_Suceess:
            return {
                userImage: action.payload
            }
        case Edit_ProfileImage_Error:
            return {
                userImage: 'error'
            }
        case Edit_ProfileImage_Clear:
            return {
                ...state,
                userImage: []
            }
        case Permissions:
            return {
                ...state,
            };
        case Permissions_Success:
            return {
                ...state,
                permission: action.payload
            };
        case Permissions_Clear:
            return {
                ...state,
                permission: []
            };
        default:
            return state;
    }
}
export default profileR;