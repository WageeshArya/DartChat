import React from 'react';

export const ChatList = (props) => {
  console.log(props.chats);
  return (
    <div>
      {
        (props.chats.length > 0) && 
          props.chats.map((chat, index) => {
            return (
            <div key={index} className="chatItem" onClick={() => props.selectChat(index)}>
              <div>
                <div>{(chat.users.filter(user => user !== props.userEmail)[0].split('')[0]).toUpperCase()}</div>
                <div>
                  <div>{chat.users.filter(user => user !== props.userEmail)[0]}</div>
                  {/* <p>{chat.messages[chat.messages.length-1].splice(0,20)}</p> */}
                </div>
              </div>
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