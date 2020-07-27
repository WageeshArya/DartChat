import React from 'react';

export const ChatList = (props) => {
  return (
    <div>
      {
        props.chats.map((chat, index) => {
          return (
          <div key={index} className="chatItem">
            <div>
              <div>{(chat.users.filter(user => user !== props.userEmail)[0].split('')[0]).toUpperCase()}</div>
              <div>
                <div>{chat.users.filter(user => user !== props.userEmail)[0]}</div>
                {/* <p>{chat.messages}</p> */}
              </div>
            </div>
          </div>
          )
        })
      }
    </div>
  )
}

export default ChatList;