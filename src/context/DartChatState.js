import React, {useReducer} from 'react';
import DartChatContext from './DartChatContext';
import DartChatReducer from './DartChatReducer';
import { SET_CHATS, SET_USER_EMAIL, SET_SELECTED_CHAT, SHOW_NEW_FORM, HIDE_NEW_FORM, SHOW_, SIGNOUT, SHOW_CHAT_LIST } from './types';

const DartChatState = (props) => {
  const initialState = {
    chats: null,
    userEmail: null,
    selectedChat: null,
    showNewForm: false,
    showChatList: true
  }
  
  const [state, dispatch] = useReducer(DartChatReducer, initialState);

  const setShowChatList = (boolValue) => {
    dispatch({
      type: SHOW_CHAT_LIST,
      payload: boolValue
    })
  }

  const showNewFormFn = () => {
    dispatch({type: SHOW_NEW_FORM})
  }

  const hideNewFormFn = () => {
    dispatch({type: HIDE_NEW_FORM})
  }

  const setChats = (chats) => {
    hideNewFormFn();
    dispatch({
      type: SET_CHATS,
      payload: chats
    })
  }

  const setUserEmail = (userEmail) => {
    hideNewFormFn();
    dispatch({
      type: SET_USER_EMAIL,
      payload: userEmail
    })
  } 

  const setSelectedChat = (index) => {
    hideNewFormFn();
    dispatch({
      type: SET_SELECTED_CHAT,
      payload: index
    })
  }

  const signout = () => {
    dispatch({type: SIGNOUT});
  }

  return <DartChatContext.Provider value={{
    chats: state.chats,
    userEmail: state.userEmail,
    selectedChat: state.selectedChat,
    showNewForm: state.showNewForm,
    showChatList: state.showChatList,
    setChats,
    setUserEmail,
    setSelectedChat,
    showNewFormFn,
    hideNewFormFn,
    signout,
    setShowChatList
  }}>
    {props.children}
    </DartChatContext.Provider>
}

export default DartChatState;