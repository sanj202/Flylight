import {
     Organization_List,Organization_List_Clear,Organization_List_Success,
     packegeTopups_Detail,packegeTopups_Detail_Success,packegeTopups_Detail_Clear } from './actionTypes';
import BaseUrl from '../../../const'


// export const importLead = (res, token, cProfile, change) => {
//     // console.log(" credentails..................", res, token, cProfile, change)
//     return (dispatch) => {
//         dispatch({ type: Import_Lead })

//         fetch(`${BaseUrl}/v1/import-lead`,
//             {
//                 method: "POST",
//                 headers: {
//                     'Accept': 'application/json',
//                     // 'Content-Type': "application/x-www-form-urlencoded",
//                     'Content-Type': 'application/json',
//                     'Authorization': 'Bearer ' + token,
//                     // 'Authorization': uid,
//                 },
//                 body: JSON.stringify({
//                     CSVFILE: res,
//                     orgid: change,
//                     profile_id: cProfile
//                 }),
//             })
//             .then(response => response.json())
//             .then(responseData => {
//                 // console.log("importLead .........::::::::::::::::", responseData)
//                 dispatch({ type: Import_Lead, payload: responseData })
//             })
//             .catch((error) => {
//                 console.log("error" + error);
//             })
//     }
// };

export const packageList = (data, token) => {
    return (dispatch) => {
        dispatch({ type: Organization_List })

        fetch(`${BaseUrl}/v1/Package`,
            {
                method: "GET",
                // headers: {
                //     'Accept': 'application/json',
                //     // 'Content-Type': "application/x-www-form-urlencoded",
                //     'Content-Type': 'application/json',
                //     'Authorization': 'Bearer ' + token,
                // },
                // body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                console.log("change TODO........::::::::::::::::", responseData.data)
                // dispatch({ type: Organization_List_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};



export const OrganizationList = (data,token,) => {
    // console.log(" credentails..................",data )
    return (dispatch) => {
        dispatch({ type: Organization_List })

        fetch(`${BaseUrl}/v1/getOrganizationList`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': "application/x-www-form-urlencoded",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                // console.log("change TODO........::::::::::::::::", responseData.data)
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
        type: Organization_List_Clear,
    };
};



