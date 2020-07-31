import React, { useState, useEffect, useContext} from 'react';
import './Chat.scss';
import goBack from '../../icons/goBack.svg';
import ChatInput from './ChatInput';
import DartChatContext from '../../context/DartChatContext';
export const Chat = (props) => {
  
  const ChatContext = useContext(DartChatContext);
  const [showChatHead, setShowChatHead] = useState(false);
  const {chats, userEmail, selectedChat} = ChatContext;

  useEffect(() => {
    const chat = document.getElementById('chatContainer');
    if(selectedChat !== null && chats[selectedChat].length > 1) {
      chat.scrollTo(0, chat.scrollHeight);
    }
    console.log(chats, selectedChat);
  },[chats, selectedChat]);

  const hideChatHead = () => {
    ChatContext.setSelectedChat(null);
    setShowChatHead(false);
    ChatContext.setShowChatList(true);
  }

  if(selectedChat === null ){
    return <div></div>
  }
  
  
  return (
    <div>
    <div className={chats ? 'chatView' : 'hide'}>
     { 
        selectedChat !== null &&
          <div className="chatBox" id="chatContainer">
            { <div className={ selectedChat !== null ? 'chatHead' : 'hide'}>
             <div onClick={hideChatHead} >
               <img src={goBack} alt="Go back to chat list"/>
             </div>
             <p>Your conversation with <strong>{chats[selectedChat].users.filter(user => user!== userEmail)[0]}</strong></p>
             </div>
            }
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