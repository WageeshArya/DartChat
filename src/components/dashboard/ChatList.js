import React from 'react';
import './ChatList.scss';
export const ChatList = (props) => {
  return (
    <div className="chatList">
      {
        (props.chats.length > 0) && 
          props.chats.map((chat, index) => {
            return (
            <div key={index} className="chatItem" onClick={() => props.selectChat(index)}>
              <div>
                <div className="chatIcon">{(chat.users.filter(user => user !== props.userEmail)[0].split('')[0]).toUpperCase()}</div>
                <div className="chatName">{chat.users.filter(user => user !== props.userEmail)[0]}</div>
              </div>
              {/* <p>{chat.messages[chat.messages.length-1].message.splice(0,20)}</p> */}
            </div>
            )
          })
        }
        {
          (props.chats.length === 0) && <div>Start a chat!</div>
        }
    </div>
  )
}

export default ChatList;