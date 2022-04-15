import { Campaign, Campaign_Success, Campaign_Clear,
Add_Edit_Campaign_Clear,Add_Edit_Campaign_Success,Add_Edit_Campaign } from '../Actions/actionTypes';
const initialState = {
    campaign: [],
    addCampaign: [],
};
const CampaignR = (state = initialState, action) => {
    switch (action.type) {
        case Campaign:
            return {
                ...state
            }
        case Campaign_Success:
            return {
                campaign: action.payload

            }
        case Campaign_Clear:
            return {
                campaign: []
            }
        case Add_Edit_Campaign:
            return {
                ...state
            }
        case Add_Edit_Campaign_Success:
            return {
                addCampaign: action.payload

            }
        case Add_Edit_Campaign_Clear:
            return {
                addCampaign: []
            }
        default:
            return state;
    }
}
export default CampaignR;