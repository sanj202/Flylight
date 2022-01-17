import {
    Import_Opportunity,
    Add_Edit_Opportunity, Add_Edit_Opportunity_Success, Add_Edit_Opportunity_Clear
} from '../Actions/actionTypes';

const initialState = {
    newOpportunity: [],
    getOpportunity: [],
    ImportOpportunity: []
};
const OpportunityR = (state = initialState, action) => {
    switch (action.type) {
        case Add_Edit_Opportunity:
            return {
                ...state,
            };
        case Add_Edit_Opportunity_Success:
            return {
                ...state,
                newOpportunity: action.payload
            };
        case Add_Edit_Opportunity_Clear:
            return {
                ...state,
                newOpportunity: []
            };



        case Import_Opportunity:
            return {
                ...state,
                ImportOpportunity: action.payload
            };
            
        default:
            return state;
    }
}
export default OpportunityR;






