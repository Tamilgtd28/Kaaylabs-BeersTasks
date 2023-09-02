import * as ActionType from '../ActionType'



export const getPunkData = (params) => {
    console.log('params', params)
    return {
        type: ActionType.GET_PUNK_DATA,
        payload: params
    }
}
