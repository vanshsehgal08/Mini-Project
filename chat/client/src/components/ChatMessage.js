import React from 'react'
import user from  '../resources/user.png'

const ChatMessage = ({message,userFlag}) => {
    const  photoURL  = ""
    const text = message
    const messageClass =  userFlag === "user" ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || user} />
        <p>{text}</p>
      </div>
    </>)
}

export default ChatMessage