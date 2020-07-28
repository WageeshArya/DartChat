import React, {useEffect, useContext} from 'react';
import './Chat.scss';
import DartChatContext from '../../context/DartChatContext';
export const Chat = (props) => {
  
  const ChatContext = useContext(DartChatContext);
  const {chats, userEmail, selectedChat} = ChatContext;

  useEffect(() => {
    const chat = document.getElementById('chatView');
    if(chat) {
      chat.scrollTo(0, chat.scrollHeight);
    } 
  },[chats])
  
  return (
    <div className={chats ? 'chatView' : 'hide'}>
     {selectedChat === null  && <div>Select a conversation to start chatting</div>}
     {
        selectedChat !== null && 
          <div>
            <div className="chatHead">Your conversation with <strong>{chats[selectedChat].users.filter(user => user!== userEmail)[0]}</strong></div>
            <div id="chatView" className="chatMain">
              {chats[selectedChat].messages.map(message => {
                return (
                  <div className={userEmail === message.sender ? 'myMessage' : 'receivedMessage' }>
                    <p className="sender"><strong>{message.sender}</strong></p>
                    <p className="message">{message.message}</p>
                  </div>
                )
              })}
            </div>
          </div>
        }
    </div>
  )
}

export default Chat;