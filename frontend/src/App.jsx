import { useState } from 'react'
import './App.css'
import React from 'react'
import { io } from 'socket.io-client'
const URL = 'http://localhost:8080';

const socket = io(URL);




function App() {
   


  return (
   <div>app</div>
  )
}

export default App
