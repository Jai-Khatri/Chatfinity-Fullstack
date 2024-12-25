import ChatContainer from "../Components/ChatContainer";
import NoChatSelected from "../Components/NoChatSelected";
import SideBar from "../Components/SideBar";
import {useChatStore} from "../store/useChatStore"
import "./Homepage.css"

const HomePage = () => {
  const {selectedUser} = useChatStore();

  return (
    <div className="HomepageCard">
      <div className="ChatSection">
        <SideBar/>

        {selectedUser? <ChatContainer/> : <NoChatSelected/>}
      </div>
    </div>
  )
}

export default HomePage
