import {SET_CHATS, SET_USER_EMAIL, SET_SELECTED_CHAT, SHOW_NEW_FORM, HIDE_NEW_FORM, SHOW_CHAT_LIST, SIGNOUT} from './types';

export default (state, action) => {
  switch(action.type) {
    case SET_CHATS: 
      return {
        ...state,
        chats: action.payload 
      }
    case SET_USER_EMAIL:
      return {
        ...state,
        userEmail: action.payload
      }
    case SET_SELECTED_CHAT:
      return {
        ...state,
        selectedChat: action.payload
      }
    case SHOW_NEW_FORM:
      return {
        ...state,
        showNewForm: true
      }
    case HIDE_NEW_FORM: 
      return {
        ...state,
        showNewForm: false
      } 
    case SHOW_CHAT_LIST: 
      return {
        ...state,
        showChatList: action.payload
      }
    case SIGNOUT: 
      return {
        chats: null,
        userEmail: null,
        selectedChat: null,
        showNewForm: false
      }
    default: 
      return state;
  }
}