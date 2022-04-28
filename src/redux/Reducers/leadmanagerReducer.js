import {
    Get_Lead_Opportunity, Lead_Opportunity_Success, Lead_Opportunity_Clear,
    LeadAssign, LeadAssign_Success, LeadAssign_Clear,
    TLead_Opportunity, TLead_Opportunity_Success, TLead_Opportunity_Clear,
    LeadTransfer, LeadTransfer_Success, LeadTransfer_Clear,
    LeadDetail, LeadDetail_Success, LeadDetail_Clear
} from '../Actions/actionTypes'
const initialState = {
    GetList: [],
    assign: [],
    GetListT: [],
    transfer: [],
    GetDetail: []
};
const lead_OpprtunityR = (state = initialState, action) => {
    switch (action.type) {
        case Get_Lead_Opportunity:
            return {
                ...state,
            };
        case Lead_Opportunity_Success:
            return {
                ...state,
                GetList: action.payload
            };
        case Lead_Opportunity_Clear:
            return {
                ...state,
                GetList: []
            };
        case TLead_Opportunity:
            return {
                ...state,
            };
        case TLead_Opportunity_Success:
            return {
                ...state,
                GetListT: action.payload
            };
        case TLead_Opportunity_Clear:
            return {
                ...state,
                GetListT: []
            };

        case LeadAssign:
            return {
                ...state,
            };
        case LeadAssign_Success:
            return {
                ...state,
                assign: action.payload
            };
        case LeadAssign_Clear:
            return {
                ...state,
                assign: []
            };

        case LeadTransfer:
            return {
                ...state,
            };
        case LeadTransfer_Success:
            return {
                ...state,
                transfer: action.payload
            };
        case LeadTransfer_Clear:
            return {
                ...state,
                transfer: []
            };
        case LeadDetail:
            return {
                ...state,
            };
        case LeadDetail_Success:
            return {
                ...state,
                GetDetail: action.payload
            };
        case LeadDetail_Clear:
            return {
                ...state,
                GetDetail: []
            };

        default:
            return state;
    }
}
export default lead_OpprtunityR;