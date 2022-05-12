import { SetStateAction, useState } from 'react'
import './App.css'
import styled from "styled-components"
import { JoinRoom } from './JoinRoom'
import { Chat } from './Chat'
import { BrowserRouter, Routes,Route } from 'react-router-dom'





const Div = styled.div`
  width: 50rem;
  height: 50rem;
 /*  border: 1px solid gray; */
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
  padding: 2rem;

  @media only screen and (max-width: 850px ) {
  width: 40rem;
  }

  @media only screen and (max-width: 670px ) {
  width: 30rem;
  }
  @media only screen and (max-width: 500px ) {
  width: 100%;
  height: 100%;
  }
`

function App() {
  function getData(roomId: string, user: string){
    setUserName(user)
    setRoomID(roomId)
  }
  const [roomID, setRoomID] = useState("")
  const [userName, setUserName] = useState("")
  return (
    <BrowserRouter>
     

        <Div>
          <Routes>
            <Route path='/' element={<JoinRoom setData={getData}/>} />
            <Route path='/:roomId' element={<Chat roomID={roomID} userName={userName} />} /> 
          </Routes>
        </Div>
        
    </BrowserRouter>

  )
}

export default App
