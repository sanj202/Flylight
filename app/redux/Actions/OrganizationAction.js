import {
    Organization_List, Organization_List_Clear, Organization_List_Success,
    packegeTopups, packegeTopups_Success, packegeTopups_Clear,
    packegeTopups_history, packegeTopups_history_Success, packegeTopups_history_Clear,
    Package_Order, Package_Order_Success, Package_Order_Clear,
    Package_Order_Verify, Package_Order_Verify_Success, Package_Order_Verify_Clear,
    TopUp_Order, TopUp_Order_Success, TopUp_Order_Clear,
    TopUp_Order_Verify, TopUp_Order_Verify_Success, TopUp_Order_Verify_Clear
} from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const packageList = (data, token) => {
    return (dispatch) => {
        dispatch({ type: packegeTopups })

        fetch(`${BaseUrl}/Packages`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                }
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: packegeTopups_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const getpackageOrder = (data, token) => {
    return (dispatch) => {
        dispatch({ type: Package_Order })

        fetch(`${BaseUrl}/CheckPackage`,
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
                dispatch({ type: Package_Order_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const VerifypackageOrder = (data, token) => {
    return (dispatch) => {
        dispatch({ type: Package_Order_Verify })
        fetch(`${BaseUrl}/VerifyPackagePayment`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: Package_Order_Verify_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const getTopOrder = (data, token) => {
    return (dispatch) => {
        dispatch({ type: TopUp_Order })

        fetch(`${BaseUrl}/CheckTopup`,
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
                dispatch({ type: TopUp_Order_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const VerifyTopOrder = (data, token) => {
    return (dispatch) => {
        dispatch({ type: TopUp_Order_Verify })
        fetch(`${BaseUrl}/VerifyTopupPayment`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                // console.log(responseData)
                dispatch({ type: TopUp_Order_Verify_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const orderHistoryList = (uid, org_id, profile_id, token) => {
    return (dispatch) => {
        dispatch({ type: packegeTopups_history })
        fetch(`${BaseUrl}/OrderHistory?uid=${uid}&org_uid=${org_id}&profile_id=${profile_id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                }
            })
            .then(response => response.json())
            .then(responseData => {
                // console.log(responseData)
                dispatch({ type: packegeTopups_history_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};



export const OrganizationList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: Organization_List })

        fetch(`${BaseUrl}/getOrganizationList`,
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
                dispatch({ type: Organization_List_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const clearResponse = () => {
    return {
        type: Organization_List_Clear,
    };
};

export const packclearResponse = () => {
    return {
        type: packegeTopups_Clear,
        type: Package_Order_Clear,
        typeof: TopUp_Order_Clear
    };
};



