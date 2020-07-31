import React, { useEffect, useState, useContext } from 'react';
import './Dashboard.scss';
import Firebase from 'firebase';

import DartChatContext from '../../context/DartChatContext';
import ChatList from './ChatList';
import Chat from './Chat';
import Loading from '../loading/Loading';
export const Dashboard = (props) => {

  const ChatContext = useContext(DartChatContext);

  const [chatList, setChatList] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showNewChatForm, setShowNewChatForm] = useState(false);
  const [showChatList, setShowChatList] = useState(true);

  const toggleChatList = () => {
    setShowChatList(!showChatList);
  }

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(async user => {
      if(!user) {
        props.history.push("/login");
        ChatContext.signout();
      }
      else {
        await Firebase
          .firestore()
          .collection('chats')
          .where('users', 'array-contains', user.email)
          .onSnapshot(async res => {
            const chats = res.docs.map(chat => chat.data())
            ChatContext.setChats(chats);
            setChatList(chats);
          });
          setUserEmail(user.email);
          ChatContext.setUserEmail(user.email)
      }
    })
  },[])

  const newChat = () => {
    console.log('new chat');
    setShowNewChatForm(true);
  }

  const selectChat = async (index) => {
    await ChatContext.setSelectedChat(index);
  }  

  return (
    <div className="dashboard">
      {!chatList && <Loading />}
      {chatList && <ChatList showChatList={showChatList} toggleChatList={toggleChatList} chats={ChatContext.chats} userEmail={userEmail} selectChat={selectChat} />}
      <Chat showChatList={showChatList} toggleChatList={toggleChatList} />
    </div>
  )
}

export default Dashboard;