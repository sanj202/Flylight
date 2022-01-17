import { combineReducers } from "redux";
// import AuthReducer from "./auth";


// import AuthKeyreducer from './AuthkeyRaducers'
import authReducer from './authReducer'
import forgotPassReducer from "./forgotPassReducer";
import registerReducer from './registerReducer';
import varificationReducer from "./varificationReducer";
import FvarificationReducer from './FvarificationReducer'
import resendReducer from './resendReducer'
import setPassReducer from "./setPassReducer";
import dashboardReducer from './dashboardReducer'
import profileRaducer from './profileRaducer'
import editProfileReducer from './editProfileReducer'
import addcontactManuallyReducer from './addcontactManuallyReducer'
import contactListRaducer from "./contactListRaducer";
import leadRaducer from './leadReducer'
import OpportunityReducer from "./opportunityReducer";
import taskmanagerReducer from './taskmanagerReducer'
import historyRaducer from './historyRaducer'
import reportReducer from './reportReducer'
import actionmanagerReducer from './actionmanagerReducer'
import leadmanagerReducer from './leadmanagerReducer'

export default combineReducers({
    //   auth: AuthReducer,
    // authkey: AuthKeyreducer,
    auth: authReducer,
    forgotPass: forgotPassReducer,
    register: registerReducer,
    varify: varificationReducer,
    Fvarify: FvarificationReducer,
    resendOTP: resendReducer,
    setPassword: setPassReducer,
    dashboard: dashboardReducer,
    profile: profileRaducer,
    Eprofile: editProfileReducer,
    ManuallyAddContact: addcontactManuallyReducer,
    contactList: contactListRaducer,
    leads:leadRaducer,
    opportunitys:OpportunityReducer,
    taskmanager:taskmanagerReducer,
    leadmanager:leadmanagerReducer,
    history:historyRaducer,
    report:reportReducer,
    actionmanager:actionmanagerReducer,
});