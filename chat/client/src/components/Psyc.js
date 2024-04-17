import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import ChatMessage from './ChatMessage';
import "./Psyc.css"
const Psyc = ({patientData}) => {

    const [socket,setSocket] = useState();
    const [text,setText] = useState("")
    const [textList,setTextList] = useState([{message:"Grettings! Dr.Psy here, How may I help you?" , userFlag:"user"}])
    useEffect(()=>{
        const s = io("http://localhost:3004")
        
        setSocket(s);
        return ()=>{
            s.disconnect()
        } 
    },[])
    async function  sendText(e){
        if (socket == null ) return ;
        e.preventDefault();
        await socket.emit("send-text", {message:text})
        setTextList((list) => [...list, {message:text , userFlag:"user"}]);
        console.log("data");
        console.log(patientData)
  
      }

      
useEffect(()=>{
      if (socket == null ) return ;
      const handler = (delta)=>{
        console.log(delta)
        setTextList((list) => [...list, {message:delta.message, userFlag:"doc"}]);

      }
        socket.on("receive-text",handler)
        return ()=>{
          socket.off("receive-text",handler)
        }
    },[socket])

    return (<div className='testing' >
     
      <main>
       
      {textList && textList.map(msg => <ChatMessage  userFlag = {msg.userFlag} message={msg.message}  />)}
      </main>
      
      <form onSubmit={sendText }>
      
        <input onChange={(e)=>setText(e.target.value)} />
        
  
        <button type="submit"  disabled={!text  }>SEND</button>
  
      </form>
    </div>
  )
}

export default Psyc