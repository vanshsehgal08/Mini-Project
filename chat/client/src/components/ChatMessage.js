import React from 'react'
import hackBattleLogo from  '../resources/hackbattle.png'

const ChatMessage = ({message,userFlag}) => {
    const  photoURL  = ""
    const text = message
    const messageClass =  userFlag === "user" ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || hackBattleLogo} />
        <p>{text}</p>
      </div>
    </>)
}

export default ChatMessage