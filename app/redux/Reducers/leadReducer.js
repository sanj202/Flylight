import {
    Import_Lead,
    Add_Edit_Lead,
    LeadOwner, LeadOwner_Success, LeadOwner_Clear,
    Get_Lead, Lead_CLEAR
} from '../Actions/actionTypes';

const initialState = {
    newLead: [],
    getLead: [],
    importLead: [],
    leadOwner: [],
};
const LeadR = (state = initialState, action) => {
    switch (action.type) {
        case Add_Edit_Lead:
            return {
                ...state,
                newLead: action.payload
            };
        case Get_Lead:
            return {
                ...state,
                getLead: action.payload
            };
        case Import_Lead:
            return {
                ...state,
                importLead: action.payload
            };
        case Lead_CLEAR:
            // console.log("callllll............")
            return {
                newLead: []
            }
        case LeadOwner:
            return {
               ...state
            }
        case LeadOwner_Success:
            return {
                leadOwner: action.payload
            }
        case LeadOwner_Clear:
            return {
                leadOwner: []
            }
        default:
            return state;
    }
}
export default LeadR;






