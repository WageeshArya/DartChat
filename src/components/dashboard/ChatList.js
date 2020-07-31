import React, { useContext, useEffect, useState } from 'react';
import './ChatList.scss';
import DartChatContext from '../../context/DartChatContext';
import NewChat from './NewChat';
import Firebase from 'firebase';
export const ChatList = (props) => {

  const ChatContext = useContext(DartChatContext);
  const {chats, userEmail, selectedChat} = ChatContext;

  useEffect(() => {

  },[chats,selectedChat]);

  const signOut = () => {
    Firebase
    .auth()
    .signOut()
  }

  const receiverClickedChat = (index) => {
    ChatContext.setShowChatList(false);
    props.selectChat(index);
    if(chats[index].messages[chats[index].messages.length - 1].sender !== userEmail) {
      const key = [userEmail, chats[index].users.filter(user => user !== userEmail)[0]].sort().join(':');
      Firebase
      .firestore()
      .collection('chats')
      .doc(key)
      .update({
        readByReceiver: true
      })
    }
  }

  return (
    <div className={ChatContext.showChatList ? 'chatList' : 'chatList hideChatList' } >
      <div>
        <button className="newChatBtn" onClick={() => ChatContext.showNewFormFn()}>New chat</button>
      </div>
      <div className="chatListDiv">
        {
          (chats.length === 0) && <div className="startChatDiv">Start a new chat!</div> 
        }
        {
        (chats.length > 0) &&
          chats.map((chat, index) => {
            
            return (
            <div key={index} className="chatItem" onClick={() => receiverClickedChat(index)}>
              <div>
                <div className="chatIcon" style={{backgroundColor: chat.iconColor}}>{(chat.users.filter(user => user !== userEmail)[0].split('')[0]).toUpperCase()}</div>
                <div className="chatName">{chat.users.filter(user => user !== userEmail)[0]}</div>
                <div className={!chat.readByReceiver && (userEmail !== chat.messages[chat.messages.length - 1].sender) ? 'notification' : 'hide'}><div className="notificationBlip"></div></div>
              </div>
            <p>{chat.messages[chat.messages.length-1].message.slice(0,30)}{chat.messages[chat.messages.length-1].message.length > 30 ? '...' : ''}</p>
            </div>
            )
          })
        }
      </div>
      <div>
        <button onClick={signOut} className="signOutBtn">Sign out</button>
      </div>
      <NewChat/>
    </div>
  )
}

export default ChatList;