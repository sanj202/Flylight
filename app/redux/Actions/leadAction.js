
import {
    Import_Lead, Import_Lead_Success, Import_Lead_Clear, Import_Lead_Error,
    Add_Edit_Lead, Add_Edit_Lead_Success, Add_Edit_Lead_Clear,
    Delete_Lead, Delete_Lead_Success, Delete_Lead_Clear,
    LeadOwner, LeadOwner_Success, LeadOwner_Clear,
    Campaign, Campaign_Success, Campaign_Clear,
    LeadStatus, LeadStatus_Success, LeadStatus_Clear,
    All_State, All_State_Success, All_State_Clear, ZipData, ZipData_Success, ZipData_Clear,
    LeadOwnerNew,LeadOwnerNew_Success,LeadOwnerNew_Clear
} from './actionTypes';
import BaseUrl from '../../../const'
import axios from 'axios';

export const addLaed = (data, token) => {
    return (dispatch) => {
        dispatch({ type: Add_Edit_Lead })
        fetch(`${BaseUrl}/v1/leadsAddEdit`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: Add_Edit_Lead_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const deleteLead = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: Delete_Lead })
        fetch(`${BaseUrl}/v1/delete-lead`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: Delete_Lead_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const LeadOwnerList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: LeadOwner })
        fetch(`${BaseUrl}/v1/getOrgUserList`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: LeadOwner_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const LeadOwneList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: LeadOwnerNew })
        fetch(`${BaseUrl}/v1/getOrgUserList`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: LeadOwnerNew_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const LeadStatusList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: LeadStatus })
        fetch(`${BaseUrl}/v1/leadsControls`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: LeadStatus_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const CampaignList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: Campaign })
        fetch(`${BaseUrl}/v1/campaign-list`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: Campaign_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const StateList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: All_State })
        fetch(`${BaseUrl}/v1/States`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: All_State_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const Get_By_ZipCodeList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: ZipData })
        fetch(`${BaseUrl}/v1/CityStateZip`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: ZipData_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};



export const importLead = (data, token) => {
    return (dispatch) => {
        dispatch({ type: Import_Lead })
        fetch(`${BaseUrl}/v1/import-lead`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                },
                body: data
            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("data......................",responseData)
                dispatch({ type: Import_Lead_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
                dispatch({ type: Import_Lead_Error, payload: error })
            })
    }
};

export const clearResponse = () => {
    return {
        type: Add_Edit_Lead_Clear,
        type: LeadOwner_Clear,
        type: Campaign_Clear,
        type: LeadStatus_Clear,
        type: All_State_Clear,
        type: ZipData_Clear,
        type: LeadOwnerNew_Clear
    };
};

export const clearDeleteLeadResponse = () => {
    return { type: Delete_Lead_Clear, };
};

export const clearImportLeadResponse = () => {
    return { type: Import_Lead_Clear };
};






