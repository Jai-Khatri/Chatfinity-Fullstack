import "./ChatBubble.css";

// eslint-disable-next-line react/prop-types
const ChatBubble = ({ imageSrc, message, image, senderId, authUserId }) => {
  const isSentByUser = senderId === authUserId; 

  return (
      <div className={`chat-bubble-container ${isSentByUser ? 'sent' : 'received'}`}>
          {!isSentByUser && (
              <div className="chat-image">
                  <img className="avatar rounded-full w-10" alt="User Avatar" src={imageSrc} />
              </div>
          )}
          <div className="chat-bubble">
              {message}
              {image && (
                  <div className="message-image">
                      <img src={image} alt="Attached" />
                  </div>
              )}
          </div>
          {isSentByUser && (
              <div className="chat-image">
                  <img className="avatar rounded-full w-10" alt="User Avatar" src={imageSrc} />
              </div>
          )}
      </div>
  );
};

export default ChatBubble;
