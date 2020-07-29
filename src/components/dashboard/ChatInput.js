import React, { Fragment, useState, useContext } from 'react';
import DartChatContext from '../../context/DartChatContext';
import './ChatInput.scss';
import send from '../../icons/send.png'
const firebase = require('firebase');
export const ChatInput = () => {

  const ChatContext = useContext(DartChatContext);
  const {chats, selectedChat, userEmail} = ChatContext;
  const [message, setMessage] = useState('');

  const inputChange = e => {
    setMessage(e.target.value);
  }

  const messageSubmit = e => {
    e.preventDefault();
    if(message && message.replace(/\s/g, '').length) {
      const key = [userEmail, chats[selectedChat].users.filter(user => user !== userEmail)[0]].sort().join(':');
      console.log(key);
      firebase
      .firestore()
      .collection('chats')
      .doc(key)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: userEmail,
          message: message,
          timestamp: Date.now()
        }),
        readByReceiver: false
      })
    }
    setMessage('');
    document.getElementById('chatInput').value = '';
  }

  const messageRead = () => {
    const key = [userEmail, chats[selectedChat].users.filter(user => user !== userEmail)[0]].sort().join(':');
      firebase
      .firestore()
      .collection('chats')
      .doc(key)
      .update({
        readByReceiver: true
      })
  }

  return (
    <Fragment>
      <form className="chatInput" autoComplete="off" onSubmit={messageSubmit}>
        <input id="chatInput" type="text" onFocus={messageRead} onChange={inputChange} placeholder="Type a message" />
        <button type="submit"><img src={send} alt="send message"/></button>
      </form>
    </Fragment>
  )
}

export default ChatInput;
