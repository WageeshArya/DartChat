import React, { useEffect, useContext, useState } from 'react';
import DartChatContext from '../../context/DartChatContext';
import './NewChat.scss';
import Firebase from 'firebase';
export const NewChat = (props) => {

  const iconColors = ['#FF8080', '#574240', '#BFA5A4', '#00BAF1', '#0084B9', '#00C082', '#A797FF'];

  const ChatContext = useContext(DartChatContext);
  const [newRecepient, setNewRecepient] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    console.log(ChatContext.showNewForm);
  },[ChatContext.showNewForm]);

  const newChatFormSubmit = async e => {
    e.preventDefault();
    console.log(newMessage);
    console.log(newRecepient);

    const usersSnap = await Firebase
    .firestore()
    .collection('users')
    .get();

    const exists = usersSnap.
    docs
    .map(doc => doc.data().email)
    .includes(newRecepient);

    if(exists) {
      const key = [newRecepient, ChatContext.userEmail].sort().join(':');
      const oldChat = await Firebase
      .firestore()
      .collection('chats')
      .doc(key)
      .get();
      console.log(oldChat.exists);
      if(oldChat.exists)
        goToChat(key, newMessage);
      else
        createChat(key, newMessage);
    }
    else {
      console.log('user does not exist.');
    }

    ChatContext.hideNewFormFn();
  }

  const sendMessage = async (key, message) => {
    await Firebase
      .firestore()
      .collection('chats')
      .doc(key)
      .update({
        messages: Firebase.firestore.FieldValue.arrayUnion({
          sender: ChatContext.userEmail,
          message: message,
          timestamp: Date.now()
        }),
        readByReceiver: false
      })
  }


  const goToChat = async (key, message) => {
    const usersInChat = key.split(':');
    const foundChat = ChatContext.chats.find( chat => usersInChat.every( user => chat.users.includes(user)))
    const index = ChatContext.chats.indexOf(foundChat);
    ChatContext.setSelectedChat(index);
    sendMessage(key, message)
  }

  const createChat = (key, message) => {
    Firebase
    .firestore()
    .collection('chats')
    .doc(key)
    .set({
      readByReceiver: false,
      users: [ChatContext.userEmail, key.split(':').filter(user => user !== ChatContext.userEmail)[0]],
      messages: [{
        sender: ChatContext.userEmail,
        message: message
      }],
      iconColor: iconColors[Math.floor(Math.random()*iconColors.length)]
    })
    .then(response => {
      setTimeout(() => {
        console.log(ChatContext.chats.length);
        if(ChatContext.chats.length === 0)
          ChatContext.setSelectedChat(0);
        else 
          ChatContext.setSelectedChat(ChatContext.chats.length - 1)
      },500);
    })
  }

  

  const closeForm = e => {
    e.preventDefault();
    ChatContext.hideNewFormFn();
  }

  return (
    <div>
      <form className={ChatContext.showNewForm ? 'newChatForm' : 'hide'} onSubmit={newChatFormSubmit}>
        <h3>New Chat</h3>
        <label htmlFor="newChatEmail">Recepient's email address</label>
        <input type="text" required id="newChatEmail" onChange={(e) => setNewRecepient(e.target.value)}/>
        <label htmlFor="newChatMessage">Your message</label>
        <input type="text" required id="newChatMessage" onChange={(e) => setNewMessage(e.target.value)} />
        <div className="newChatFormBtns">
          <input type="submit"/>
          <button onClick={closeForm}>Cancel</button>
        </div>
        
      </form>
    </div>
  )
}

export default NewChat;