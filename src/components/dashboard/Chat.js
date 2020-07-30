import React, {Fragment, useRef, useEffect, useContext} from 'react';
import './Chat.scss';
import ChatInput from './ChatInput';
import DartChatContext from '../../context/DartChatContext';
export const Chat = (props) => {
  
  const ChatContext = useContext(DartChatContext);
  const {chats, userEmail, selectedChat} = ChatContext;

  useEffect(() => {
    const chat = document.getElementById('chatContainer');

    if(selectedChat !== null && chats[selectedChat].length > 1) {
      chat.scrollTo(0, chat.scrollHeight);
    }
    console.log(chats, selectedChat);
  },[chats, selectedChat])
  
  return (
    <div>
    <div className={chats ? 'chatView' : 'hide'}>
     {
        selectedChat === null  && <div>Select a conversation to start chatting</div>
     }
     { 
        selectedChat !== null &&
          <div className="chatBox" id="chatContainer">
            <div className="chatHead">Your conversation with <strong>{chats[selectedChat].users.filter(user => user!== userEmail)[0]}</strong></div>
            <div className="chatMain">
              {chats[selectedChat].messages.map(message => {
                if(message.sender) {
                  console.log(message.sender);
                  return (
                    <div className="messageDiv">
                      <div className={userEmail === message.sender ? 'messageView myMessage' : 'messageView receivedMessage' }>
                        <p className="sender"><strong>{message.sender}</strong></p>
                        <p className="message">{message.message}</p>
                      </div>
                    </div>
                  )
                }
                else {
                  return <div></div>
                }
              })}
            </div>
          </div>
        }
        <div className={ selectedChat !== null ?'inputDiv' : 'hide'}>
          <ChatInput />
        </div>
    </div>
    
    </div>
  )
}

export default Chat;