import { Import_Opportunity, Add_Edit_Opportunity, Get_Opportunity, Opportunity_CLEAR } from '../Actions/actionTypes';

const initialState = {
    newOpportunity: [],
    getOpportunity: [],
    ImportOpportunity:[]
};
const OpportunityR = (state = initialState, action) => {
    switch (action.type) {
        case Add_Edit_Opportunity:
            return {
                ...state,
                newOpportunity: action.payload
            };
        case Get_Opportunity:
            return {
                ...state,
                getOpportunity: action.payload
            };
        case Import_Opportunity:
            return {
                ...state,
                ImportOpportunity: action.payload
            };
        case Opportunity_CLEAR:
            // console.log("callllll............")
            return {
                newOpportunity: []
            }
        default:
            return state;
    }
}
export default OpportunityR;






