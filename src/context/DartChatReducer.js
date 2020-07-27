import {SET_CHATS, SET_USER_EMAIL, SET_SELECTED_CHAT} from './types';

export default (state, action) => {
  switch(action.type) {
    case SET_CHATS: 
    return {
      ...state,
      chats: action.payload 
    }
  }
}