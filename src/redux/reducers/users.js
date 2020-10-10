import {GET_ALL_USERS, LOADING_USERS} from '../actions/types'





const initialState = {
  loadingUsers: false,
  users: null
}

const users = (state = initialState, action) => {
  switch(action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        loadingUsers: false,
        users: action.payload
      }
    case LOADING_USERS: 
      return {
        ...state,
        loadingUsers: true
      }
    default:
      return state
  }
}


export default users