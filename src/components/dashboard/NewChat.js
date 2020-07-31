import React, { useEffect, useContext, useState } from 'react';
import DartChatContext from '../../context/DartChatContext';
import './NewChat.scss';
import Firebase from 'firebase';
export const NewChat = (props) => {

  const iconColors = ['#FF8080', '#574240', '#BFA5A4', '#00BAF1', '#0084B9', '#00C082', '#A797FF'];

  const ChatContext = useContext(DartChatContext);
  const [newRecepient, setNewRecepient] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);
  useEffect(() => {
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
      setUserNotFound(true);
      setTimeout(() => {
        setUserNotFound(false);
      },2500)
    }

    ChatContext.hideNewFormFn();
  }

  const sendMessage = async (key, message) => {
    const date = new Date;
    await Firebase
      .firestore()
      .collection('chats')
      .doc(key)
      .update({
        messages: Firebase.firestore.FieldValue.arrayUnion({
          sender: ChatContext.userEmail,
          message: message,
          timestamp: `${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes()} ${date.getHours() > 12 ? 'PM' : 'AM' }`
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
    const date = new Date;
    Firebase
    .firestore()
    .collection('chats')
    .doc(key)
    .set({
      readByReceiver: false,
      users: [ChatContext.userEmail, key.split(':').filter(user => user !== ChatContext.userEmail)[0]],
      messages: [{
        sender: ChatContext.userEmail,
        message: message,
        timestamp: `${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes()} ${date.getHours() > 12 ? 'PM' : 'AM' }`
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
      ChatContext.setShowChatList(false);
    })
  }

  const closeForm = e => {
    e.preventDefault();
    ChatContext.hideNewFormFn();
  }

  return (
    <div>
      <div className={userNotFound ? 'userNotFound' : 'hide' }>
      <p>Sorry, we couldn't find {newRecepient}</p>
      </div>
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