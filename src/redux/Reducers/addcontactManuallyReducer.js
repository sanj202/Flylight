
import {
    Add_Contact_Manually_Success, Add_Contact_Manually, Add_Contact_Manually_Clear,
    Edit_Contact, Edit_Contact_Suceess, Edit_Contact_Clear
} from '../Actions/actionTypes';
const initialState = {
    data: [],
    EditedData: [],
};
const M_addContactR = (state = initialState, action) => {
    switch (action.type) {
        case Add_Contact_Manually:
            return {
                ...state,
            };
        case Add_Contact_Manually_Success:
            return {
                ...state,
                data: action.payload
            };
        case Add_Contact_Manually_Clear:
            return {
                data: []
            }
        case Edit_Contact:
            return {
                ...state,
            };
        case Edit_Contact_Suceess:
            return {
                ...state,
                EditedData: action.payload
            };
        case Edit_Contact_Clear:
            return {
                EditedData: []
            }
        default:
            return state;
    }
}
export default M_addContactR;