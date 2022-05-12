import styled from "styled-components";
import React, {ChangeEvent, useEffect, useState} from "react";
import { io } from "socket.io-client";



const Div = styled.div`
    text-align: center;
    .message-area{

        .messages{
            width: 100%;
            border: 1px solid #ececec;
            height: 40rem;
            border-radius: 15px;
            display: flex;
            flex-direction: column-reverse;
            padding: 1rem;

            overflow-x: auto;
            .sending{
                display: flex;
                flex-direction: column;
            }
            .send{
                display: flex;
                justify-content: right;
                margin: 1rem 0;
                .send-content{
                    p{
                     background-color: #5534A5;
                     color: aliceblue;
                     padding: .5rem;
                     border-radius: 5px;
                    }   
                    span{
                        display: flex;
                        justify-content: right;
                    }
                }               
            }
            .recive{
                display: flex;
                margin: 1rem 0;
                justify-content: left;
                .recive-content{
                    p{
                     background-color: #A85CF9;
                     color: aliceblue;
                     padding: .5rem;
                     border-radius: 5px;
                    }   
                    span{
                        display: flex;
                        justify-content: left;
                    }
                }          
            }
        }
        .show-message{
           
        }
        .send-message{
            input{
                margin-top:1rem ;
                width: 30rem;
                height: 3rem;
                padding: 0 1rem;
                border-radius: 5px;
                border: 1px solid gray;

                &:focus{
                    outline: none;
                }
                @media only screen and (max-width: 670px ) {
                width: 20rem;
                }
                @media only screen and (max-width: 500px ) {
                width: 70%;
                }
            }
            button{
                width: 5rem;
                height: 3rem;
                cursor: pointer;                
                border-radius: 5px;
                border: none;
                margin-left:1rem ;
                background-color: #4B7BE5;
                color: aliceblue;
                
            }
        }
    }
`
const socket = io("http://localhost:3001/")
type ChatProps = {
    roomID: string,
    userName: string
}
interface IMessage{
    Message: string,
    Time: string,
}
export function Chat(props: ChatProps){
    const [currentMessage, setCurrentMessage] = useState("")
    const [newMessage, setNewMessage] = useState<IMessage[]>([])

    const sendMessage =  async ()  =>{
        if(currentMessage !== ""){
            const messageData = {
                room: props.roomID,
                userName: props.userName,
                time: new Date(Date.now()).getHours() +":"+ new Date(Date.now()).getMinutes(),
                message: currentMessage,
            }
           await socket.emit("send_message", messageData)   
            const newMessageData = {Message: messageData.message, Time: messageData.time}
            setNewMessage([...newMessage, newMessageData])
            setCurrentMessage("")
        }        
    }
    useEffect(() =>{
            socket.on("recive_message", (data) =>{
            const newMessageData = {Message: data.message, Time: data.time}
            setNewMessage([...newMessage, newMessageData])
        })
    }, [socket])
    type MessageProps = {
        message: string,
        time: string
    }
    function ShowMessage(props: MessageProps){
        return(
        <div className="send"> 
            <div className="send-content">
                <p>{props.message}</p>
                <span>{props.time}</span>
            </div>
        </div>
        )
    }
    return(
        <Div>
            <div className="room-name">
                <h2>Ola mundo</h2>
            </div>

            <div className="message-area">
                <div className="messages">
                        <div className="show-message" >
                            <div className="message-atual">
                                {
                                    newMessage.map((message, key: number) =>{
                                        return <ShowMessage message={message.Message} time={message.Time} key={key}/>
                                    })
                                }
                            </div>
                        </div>
                </div>

                <div className="send-message">
                    <input type="text" value={currentMessage} onChange={(event: ChangeEvent<HTMLInputElement>)=>{setCurrentMessage(event.target.value)}}/>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </Div>
    )
}