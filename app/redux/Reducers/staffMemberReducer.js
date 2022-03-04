import { 
    Invite_Member,Invite_Member_Success,Invite_Member_Clear,
    profileRole,profileRole_Success,profileRole_Clear
 } from '../Actions/actionTypes';

const initialState = {
    inviteData: [],
    role: [],
};
const InvitationR = (state = initialState, action) => {
    switch (action.type) {
        case Invite_Member:
            return {
                ...state,
            };
        case Invite_Member_Success:
            return {
                ...state,
                inviteData: action.payload
            };
        case Invite_Member_Clear:
            return {
                ...state,
                inviteData: []
            };
            case profileRole:
                return {
                    ...state,
                };
            case profileRole_Success:
                return {
                    ...state,
                    role: action.payload
                };
            case profileRole_Clear:
                return {
                    ...state,
                    role: []
                };
        default:
            return state;
    }
}
export default InvitationR;






