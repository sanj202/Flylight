import { 
    Invite_Member,Invite_Member_Success,Invite_Member_Clear
 } from '../Actions/actionTypes';

const initialState = {
    inviteData: [],
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
        default:
            return state;
    }
}
export default InvitationR;






