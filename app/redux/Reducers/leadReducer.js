import {
    Import_Lead, Import_Lead_Success, Import_Lead_Clear, Import_Lead_Error,
    Delete_Lead, Delete_Lead_Success, Delete_Lead_Clear,
    Add_Edit_Lead, Add_Edit_Lead_Success, Add_Edit_Lead_Clear,
    LeadOwner, LeadOwner_Success, LeadOwner_Clear,
    Campaign, Campaign_Success, Campaign_Clear,
    LeadStatus, LeadStatus_Success, LeadStatus_Clear,
    All_State, All_State_Success, All_State_Clear,
    ZipData, ZipData_Success, ZipData_Clear
} from '../Actions/actionTypes';

const initialState = {
    newLead: [],
    importLead: [],
    leadOwner: [],
    deleteLead: [],
    campaign: [],
    leadstatus: [],
    states: [],
    ByZip: []
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
        case LeadStatus:
            return {
                ...state
            }
        case LeadStatus_Success:
            return {
                leadstatus: action.payload
            }
        case LeadStatus_Clear:
            return {
                leadstatus: []
            }
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
        case Delete_Lead:
            return {
                ...state
            }
        case Delete_Lead_Success:
            return {
                ...state,
                deleteLead: action.payload
            }
        case Delete_Lead_Clear:
            return {
                deleteLead: []
            }

        case All_State:
            return {
                ...state
            }
        case All_State_Success:
            return {
                ...state,
                states: action.payload
            }
        case All_State_Clear:
            return {
                states: []
            }

        case ZipData:
            return {
                ...state
            }
        case ZipData_Success:
            return {
                ...state,
                ByZip: action.payload
            }
        case ZipData_Clear:
            return {
                ByZip: []
            }

        case Import_Lead:
            return {
                ...state,
            };
        case Import_Lead_Success:
            return {
                ...state,
                importLead: action.payload
            };
        case Import_Lead_Error:
            return {
                importLead: 'error'
            };
        case Import_Lead_Clear:
            return {
                ...state,
                importLead: []
            };

        default:
            return state;
    }
}
export default LeadR;






