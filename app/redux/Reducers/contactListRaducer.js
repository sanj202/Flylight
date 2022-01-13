import {
    Contact_List, Contact_List_Suceess, Contact_Clear,
    Record_Feedback, Record_Feedback_Sucess, Record_Feedback_Clear
} from '../Actions/actionTypes';
const initialState = {
    contacts: [],
    feedbacks: []
};
const contactListR = (state = initialState, action) => {
    switch (action.type) {
        case Contact_List:
            return {
                ...state,
            };
        case Contact_List_Suceess:
            return {
                ...state,
                contacts: action.payload
            };

        case Contact_Clear:
            return {
                ...state,
                contacts: []
            };
        case Record_Feedback:
            return {
                ...state,
            };
        case Record_Feedback_Sucess:
            return {
                ...state,
                feedbacks: action.payload
            };

        case Record_Feedback_Clear:
            return {
                ...state,
                feedbacks: []
            };
        default:
            return state;
    }
}
export default contactListR;






