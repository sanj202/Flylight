import {
    Import_Opportunity,
    Add_Edit_Opportunity, Add_Edit_Opportunity_Success, Add_Edit_Opportunity_Clear,
    Delete_Opportunity, Delete_Opportunity_Success, Delete_Opportunity_Clear
} from '../Actions/actionTypes';

const initialState = {
    newOpportunity: [],
    getOpportunity: [],
    ImportOpportunity: [],
    deleteOpportunity: []
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

        case Delete_Opportunity:
            return {
                ...state,
            };
        case Delete_Opportunity_Success:
            return {
                ...state,
                deleteOpportunity: action.payload
            };
        case Delete_Opportunity_Clear:
            return {
                ...state,
                deleteOpportunity: []
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






