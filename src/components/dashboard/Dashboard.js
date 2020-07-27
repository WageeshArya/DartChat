import React, { useEffect, useState } from 'react';
import Firebase from 'firebase';

import ChatList from './ChatList';
export const Dashboard = (props) => {

  const [chats, setChats] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    Firebase.auth().onAuthStateChanged(async user => {
      if(!user) {
        props.history.push("/");
      }
      else {
        await Firebase
          .firestore()
          .collection('chats')
          .where('users', 'array-contains', user.email)
          .onSnapshot(async res => {
            const chats = res.docs.map(chat => chat.data())
            setChats(chats);
          });
          setUserEmail(user.email);
          console.log(userEmail);
      }
    })
  },[])
  console.log(chats);
  return (
    <div>
      {!chats && <div>Loading...</div>}
      {chats && <ChatList chats={chats} userEmail={userEmail} />}
    </div>
  )
}

export default Dashboard;