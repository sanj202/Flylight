
import {Campaign, Campaign_Clear, Campaign_Success,
    Add_Edit_Campaign, Add_Edit_Campaign_Clear, Add_Edit_Campaign_Success} from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const CampaignList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: Campaign })
        fetch(`${Base_NodeUrl}/getCampaignList`,
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
export const clearResponse = () => {
    return {
        type: Campaign_Clear
    };
};
export const Add_EditCampaign = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: Add_Edit_Campaign })
        fetch(`${BaseUrl}/addedit-campaign`,
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
                dispatch({ type: Add_Edit_Campaign_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const AddEditclearResponse = () => {
    return {
        type: Add_Edit_Campaign_Clear
    };
};