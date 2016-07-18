import React from 'react';
import ReactDOM from 'react-dom';
import ChatRoom from './components/ChatRoom.jsx';
import BootstrapData from '../shared/BootstrapData';

ReactDOM.render(
  <ChatRoom requestinfo={BootstrapData.getJSON('chatroom')} offerlists={BootstrapData.getJSON('offerlists')}/>,
  document.getElementById('chatroom')
);
