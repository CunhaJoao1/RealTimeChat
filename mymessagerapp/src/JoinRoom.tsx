import styled from "styled-components";
import React, {useState, ChangeEvent} from "react";
import { Link } from "react-router-dom";
import  {io, Socket} from "socket.io-client";

const Div = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
    .title{
        h1{
            text-align: center;
        }
    }
    div{
        display: flex;
        flex-direction: column;
        input{
            height: 3rem;
            width: 15rem;
            border-radius: 5px;
            margin-bottom: 2rem;
            /* border: 1px solid gray; */
            border: none;
            box-shadow: 0px 6px 15px .3px rgba(0,0,0,0.1);
            padding: 0 1rem;
            &:focus{
                outline: none;
            }
        }
        button{
            height: 3rem;
            background-color: #A85CF9;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            color: #ffffff;
            width: 100%;
        }
    }
`

const socket = io("http://localhost:3001/")

type JoinTypes = {
    setData: Function,
}
export function JoinRoom(props: JoinTypes){
    const [roomId, setRoomId] = React.useState("");
    const [userName, setUserName] = useState("");

    return(
        <Div>
            <div className="title">
                <h1>My Messager App</h1>
            </div>
            <div>
                <input type="text" placeholder="Room ID" onChange={(event: ChangeEvent<HTMLInputElement>) => {setRoomId(event.target.value)}}/>
                <input type="text" placeholder="User Name" onChange={(event: ChangeEvent<HTMLInputElement>) => {setUserName(event.target.value)}}/>
               <Link to={`/${roomId}`} onClick={() => {userName !== ""? socket.emit("join-room", roomId): alert("Preencha os campos") }}> <button onClick={() => props.setData(roomId, userName)}>Join Room</button></Link> 
            </div>
        </Div>
    )
}