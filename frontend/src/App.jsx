import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import "./App.css";
const App = () => {
  return (
    <div>
    <Routes>
   <Route path="/" element={<HomePage/>} exact />
      <Route path="/chats" element={<ChatPage/>} />   
      </Routes>
    </div>
  )
}

export default App
