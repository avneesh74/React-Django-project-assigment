import { CREATE_MESSAGES } from './types'


export const createMessages = msg => {
    return {
        type: CREATE_MESSAGES,
        payload: msg
    }
}