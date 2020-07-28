import React, {useReducer} from 'react';
import DartChatContext from './DartChatContext';
import DartChatReducer from './DartChatReducer';
import { SET_CHATS, SET_USER_EMAIL, SET_SELECTED_CHAT } from './types';

const DartChatState = (props) => {
  const initialState = {
    chats: null,
    userEmail: null,
    selectedChat: null
  }
  
  const [state, dispatch] = useReducer(DartChatReducer, initialState);

  const setChats = (chats) => {
    dispatch({
      type: SET_CHATS,
      payload: chats
    })
  }

  const setUserEmail = (userEmail) => {
    dispatch({
      type: SET_USER_EMAIL,
      payload: userEmail
    })
  } 

  const setSelectedChat = (index) => {
    dispatch({
      type: SET_SELECTED_CHAT,
      payload: index
    })
  }


  return <DartChatContext.Provider value={{
    chats: state.chats,
    userEmail: state.userEmail,
    selectedChat: state.selectedChat,
    setChats,
    setUserEmail,
    setSelectedChat
  }}>
    {props.children}
    </DartChatContext.Provider>
}

export default DartChatState;