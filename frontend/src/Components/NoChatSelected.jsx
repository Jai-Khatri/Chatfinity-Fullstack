import "./NoChatSelected.css"
import ChatfinityLogo from '../assets/Chatfinity_transparent-.png'

const NoChatSelected = () => {
  return (
    <div className="container">
        <img src={ChatfinityLogo} alt="" />
      <h1>Welcome to ChatFinity!</h1>
      <h3>Select a user to start chatting</h3>
    </div>
  )
}

export default NoChatSelected
