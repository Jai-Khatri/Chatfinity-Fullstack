import { useAuthStore } from "../store/useAuthStore"
import AvatarImage from "../assets/Avatar.png"
import { useState } from "react";
import "./ProfilePage.css"
import { useEffect } from "react";

const ProfilePage = () => {

  const { updateProfile,isUpdatingProfile , authUser , isCheckingAuth , checkAuth} = useAuthStore();
  const [selectedImage , setSelectedImage] = useState(null);


  useEffect(() => {
    checkAuth();
  }, [checkAuth]); 

  const handleImageUpload = async(e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async() => {
      const base64Image = reader.result;
      setSelectedImage(base64Image)
      await updateProfile({profilePic: base64Image})
    }
  }

  return (
  <div className="card">
    <div className="profilePage">
      <h1>Profile</h1>


        <img src={selectedImage || authUser.profilePic || AvatarImage} alt="Profile Pic" />
        <input type="file" accept="image/*" disabled={isUpdatingProfile} onChange={handleImageUpload}>
        </input>
      <p>
        {isUpdatingProfile? "Uploading..." : 'Click the "Choose file" button to change your profile pic'}
      </p>

      {isCheckingAuth ? (<p>Loading user information..</p>) : ( 
        <>
        <div className="info">
        <h2>Full name:- </h2>
        <p>{authUser?.fullName}</p>
      </div>

      <div className="info">
        <h2>Email:- </h2>
        <p>{authUser?.email}</p>
      </div>

      {authUser.createdAt && <div className="info">
        <h2>Member since:</h2>
        <p>{new Date(authUser.createdAt).toLocaleDateString()}</p>
      </div>}
      </>
)}
     
    </div>
  </div>
  )
}

export default ProfilePage
