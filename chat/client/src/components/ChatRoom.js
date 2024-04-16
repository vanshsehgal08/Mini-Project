import React, { useEffect, useRef, useState } from 'react'
import "../App.css"
import ChatMessage from './ChatMessage';
import {io} from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatRoom = ({setPatientData}) => {
    const dummy = useRef();

  
    const [formValue, setFormValue] = useState('');
    const [socket,setSocket] = useState();
    const [messages,setMessages] = useState([{message:"Greeting!! I am you medicare bot I am here to help you with your diagnostics! Should we proceed?",  userFlag:"bot"} ])
    const [botReply,setBoatReply] = useState({question:"Greeting!! I am you medicare bot I am here to help you with your diagnostics!", options:["Yes"] , points : 30 , tag:"depression",userFlag:"bot"} )
    const [isfirstQuestion,SetIsfirstQuestion] = useState(true);
    const [isLimitReached,SetIsLimitReached] = useState(false);
    const [text,setText] = useState("")
    const [textList,setTextList] = useState([{message:"Grettings! Dr.Psy here, How may I help you?" , userFlag:"doc"}])
    const [temp,setTemp] = useState(false);
    const [temp2,setTemp2] = useState(false);
    useEffect(()=>{
        const s = io("http://localhost:3006")
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

      setFormValue('');

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




    const sendMessage = async (e) => {
        e.preventDefault();
    
        
        
        if(isfirstQuestion){
                
            await socket.emit("send-message", {message:"nope",question:"do you think people gossip behind your back"})
            SetIsfirstQuestion(false)

         }else{

            // setMessages([...messages, {message:formValue, userFlag:"user"}])
            await socket.emit("send-message", {message:formValue,question:botReply.question})
        }
       // userMessaege =  {message:formValue, flag:"user"}
       setMessages((list) => [...list, {message:formValue,question:botReply.question, userFlag:"user"}]);
        
        if(temp && temp2){
          
          SetIsLimitReached(true)
          
        }else{
          setTemp2(true)
        }
        setFormValue('');
        
      }
      useEffect(()=>{
        if (socket == null || isLimitReached ) return 
        const handler = (delta)=>{
            
            
              //  setMessages([...messages, ...delta])
              setBoatReply(delta.data)
             // setTimeout(()=>{

            
                setMessages((list) => [...list, {message:delta.data.question,  userFlag:"bot"} ]) 

                dummy.current.scrollIntoView({ behavior: 'smooth' });
            //},500)
            

        }
        socket.on("reply", handler);
        
        return ()=>{
            socket.off("reply",handler)
        }
    },[socket])

    
    useEffect(()=>{
      if (socket == null ) return 
      const handler = (delta)=>{
        setMessages((list) => [...list, {message:"Do you want to talk to a psychiatrist ?",question:botReply.question, userFlag:"bot"}]);
        setBoatReply({options:["Yes" ]})
        console.log({delta:delta, messages:messages })
        setPatientData({delta:delta, messages:messages })
        setTemp(true)
        //SetIsLimitReached(true)
      }
      socket.on("reply-on-limit-breach",handler);
      return ()=>{
        socket.off("reply-on-limit-breach",handler);
      }
    },[socket])
    
    return (<>
      {!isLimitReached ? 
      <main>
        <ScrollToBottom>
        {messages && messages.map(msg => <ChatMessage  userFlag = {msg.userFlag} message={msg.message}  />)}
        </ScrollToBottom>
        <span ref={dummy}> <p>--------------</p></span>
        {botReply.options && botReply.options.map(op => { 
          
          return(
            <div onClick={ (e) => setFormValue(op)}>

        <ChatMessage message={op}/>
        </div> )
        }
        )}
      </main>
      :
      <main>
       
      {textList && textList.map(msg => <ChatMessage  userFlag = {msg.userFlag} message={msg.message}  />)}
      </main>
      }
      <form onSubmit={!isLimitReached? sendMessage : sendText }>
        {!isLimitReached?<input  value={formValue} /> : 
        <input onChange={(e)=>setText(e.target.value)} />
        }
  
        <button type="submit"   disabled={!isLimitReached? !formValue :!text  }>SEND</button>
  
      </form>
    </>)
}

export default ChatRoom