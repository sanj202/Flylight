import { Get_Todo } from '../Actions/actionTypes';

const initialState = {
    getList: [],
};
const taskmanagerR = (state = initialState, action) => {
    switch (action.type) {
        case Get_Todo:
            return {
                ...state,
                getList: action.payload
            };
        default:
            return state;
    }
}
export default taskmanagerR;






