import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import ImageIcon from "../assets/Image-icon.png";
import SendIcon from "../assets/Send-icon.png";
import toast from "react-hot-toast";
import './MessageInput.css'; 

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });

            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="message-input-container">
            {imagePreview && (
                <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button 
                        className="remove-image-btn"
                        onClick={removeImage}
                        type="button"
                    >
                        X
                    </button>
                </div>
            )}

            <form className="message-form" onSubmit={handleSendMessage}>
                <input 
                    type="text" 
                    placeholder="Type a message...."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="message-input"
                />

                <input
                    type="file"
                    accept="image/*"
                    hidden={true}
                    ref={fileInputRef} 
                    onChange={handleImageChange}               
                />

                <button 
                    type="button"
                    className="button-icon"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <img src={ImageIcon} alt="Upload" />
                </button>

                <button
                    type="submit"
                    disabled={!text.trim() && !imagePreview}
                    className="button-icon"
                >
                    <img src={SendIcon} alt="Send" />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
