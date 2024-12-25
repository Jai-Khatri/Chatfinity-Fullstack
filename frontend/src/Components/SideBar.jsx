import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import AvatarImage from "../assets/Avatar.png"
import "./Sidebar.css"
import { useAuthStore} from '../store/useAuthStore.js'

const SideBar = () => {
    const {getUsers, users, selectedUser, setSelectedUser, isUserLoading} = useChatStore();


    const {onlineUsers} = useAuthStore();
    
    useEffect(() =>{
        getUsers()
    }, [getUsers])

    if(isUserLoading) return <div> <p>Loading....</p></div>

  return (
   <aside>
    <div>
        <div>
            <h2 className="userListTxt">Users:- </h2>
        </div>
        <div className="users">
            {users.map((user) => (
                <button className="userBtn"
                key={user._id}
                onClick={() => setSelectedUser(user)}
                style={{
                    backgroundColor: selectedUser?._id === user._id ? '#242424' : 'initial',
                    color: selectedUser?._id === user._id ? 'white' : 'initial'
                }}
                >
                    <div>
                        <img src={user.profilePic || AvatarImage} alt={user.name} />
                        {onlineUsers.includes(user.id) && (
                            <span className="onlineIndicator"/>
                        )}
                    </div>

                    <div className="userTxt">
                        <h2>{user.fullName}</h2>
                        <h3 style={{color: onlineUsers.includes(user._id) ? "green" : 'red',
                        }} >{onlineUsers.includes(user._id) ? "Online" : "Offline"}
                        </h3>
                    </div>
                </button>
            )
            )}
        </div>
    </div>
   </aside>
  )
}

export default SideBar;
