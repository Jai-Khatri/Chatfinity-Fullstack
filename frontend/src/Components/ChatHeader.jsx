import { useChatStore } from "../store/useChatStore"
import AvatarImage from "../assets/Avatar.png"
import "./ChatHeader.css"
import { useAuthStore } from "../store/useAuthStore"

const ChatHeader = () => {
    const {selectedUser , setSelectedUser} = useChatStore()
    const {onlineUsers} = useAuthStore();
    
  return (
    <div className="mainHeader">
      <div className="chatHeader">
        <img src={selectedUser.profilePic || AvatarImage} alt={selectedUser.fullName}/>
        <span>
        <h3>{selectedUser.fullName}</h3>
        <p style={{color: onlineUsers.includes(selectedUser._id) ? "green" : "red"}}>
          {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </span>
        <button onClick={() => setSelectedUser(null)}>X</button>
      </div>
    </div>
  )
}

export default ChatHeader
