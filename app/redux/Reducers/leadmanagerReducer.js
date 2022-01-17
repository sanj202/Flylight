import {Get_Lead_Opportunity ,Lead_Opportunity_Success,Lead_Opportunity_Clear} from '../Actions/actionTypes'

const initialState = {
   GetList:[]
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
        default:
            return state;
    }
}
export default lead_OpprtunityR;






