import {
    Import_Lead,
    Add_Edit_Lead, Add_Edit_Lead_Success, Add_Edit_Lead_Clear,
    LeadOwner, LeadOwner_Success, LeadOwner_Clear} from '../Actions/actionTypes';

const initialState = {
    newLead: [],
    importLead: [],
    leadOwner: [],
};
const LeadR = (state = initialState, action) => {
    switch (action.type) {
        case Add_Edit_Lead:
            return {
                ...state,
            };
        case Add_Edit_Lead_Success:
            return {
                ...state,
                newLead: action.payload
            };
        case Add_Edit_Lead_Clear:
            return {
                ...state,
                newLead: []
            };
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





        case Import_Lead:
            return {
                ...state,
                importLead: action.payload
            };



        default:
            return state;
    }
}
export default LeadR;






