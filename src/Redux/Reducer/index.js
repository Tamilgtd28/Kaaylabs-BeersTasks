import * as ActionType from '../ActionType'


const initialState = {
    punkData: undefined,
    numOfPages: 0,
    currentPage: 1,
}


const AppReducer = (state = initialState, action) => {


    switch (action.type) {

        //get punk data

        case ActionType.GET_PUNK_DATA:
            state = { ...state, punkData: action.payload }
            break;





        default:
            state = state
            break
    }

    return state
}


export { AppReducer }