import {
    Get_Notification, Notification_Suceess, Notification_Clear,
} from '../Actions/actionTypes';

const initialState = {
  
    userNotification: [],
};
const notificationR = (state = initialState, action) => {
    switch (action.type) {
      
        case Get_Notification:
            return {
                ...state,
            };
        case Notification_Suceess:
            return {
                ...state,
                userNotification: action.payload
            };
        case Notification_Clear:
            return {
                ...state,
                userNotification: []
            };


        default:
            return state;
    }
}
export default notificationR;






