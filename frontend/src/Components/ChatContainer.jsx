import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import AvatarImage from "../assets/Avatar.png";
import ChatBubble from "./ChatBubble"; 
import "./ChatContainer.css";

const ChatContainer = () => {
  const { selectedUser, messages, getMessages, isMessagesLoading,subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser,  } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();

      return () => unsubscribeFromMessages();
    }
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) return <div><h1>Loading...</h1></div>;

  return (
      <div className="chat-container">
          <div className="chat-header">
              <ChatHeader />
          </div>
          <div className="messages">
              {messages.map((message) => (
                  <ChatBubble 
                      key={message._id}
                      imageSrc={message.senderId === authUser._id ? authUser.profilePic || AvatarImage : selectedUser.profilePic || AvatarImage} 
                      message={message.text}
                      image={message.image} 
                      senderId={message.senderId} 
                      authUserId={authUser._id} 
                  />
              ))}
              <div ref={messageEndRef} />
          </div>
          <div className="message-input-container">
              <MessageInput />
          </div>
      </div>
  );
};

export default ChatContainer;
