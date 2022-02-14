import {
    Meeting, Meeting_Success, Meeting_Clear,
    Add_Edit_Meeting, Add_Edit_Meeting_Success, Add_Edit_Meeting_Clear,
    Meeting_Detail, Meeting_Detail_Success, Meeting_Detail_Clear
} from '../Actions/actionTypes';

const initialState = {
    newMeeting: [],
    meetings: [],
    meetingDetail: [],
};
const LeadR = (state = initialState, action) => {
    switch (action.type) {
        case Add_Edit_Meeting:
            return {
                ...state,
            };
        case Add_Edit_Meeting_Success:
            return {
                ...state,
                newMeeting: action.payload
            };
        case Add_Edit_Meeting_Clear:
            return {
                ...state,
                newMeeting: []
            };

        case Meeting:
            return {
                ...state
            }
        case Meeting_Success:
            return {
                meetings: action.payload
            }
        case Meeting_Clear:
            return {
                meetings: []
            }

        case Meeting_Detail:
            return {
                ...state
            }
        case Meeting_Detail_Success:
            return {
                meetingDetail: action.payload
            }
        case Meeting_Detail_Clear:
            return {
                meetingDetail: []
            }



        default:
            return state;
    }
}
export default LeadR;






