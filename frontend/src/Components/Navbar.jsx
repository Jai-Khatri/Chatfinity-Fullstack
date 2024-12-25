import { Link } from 'react-router-dom';
import "./Navbar.css";
import ProfileImage from '../assets/Profile.png'; 
import LogOut from '../assets/Log out.png'
import HomepageImage from "../assets/Homepage.png"
import { useAuthStore } from '../store/useAuthStore';

export const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  function handleLogOutClick(){
    logout();
  }
  return (
    <div className="navbar">
      <h1>Chatfinity</h1>
      <div className='navBtns'>
       <nav>
         <ul>
         {authUser && (
            <li className='LogOutLink'>
              <button onClick={handleLogOutClick} id='link'>
                <span>
                  <img src={LogOut} alt="Log out" />
                  Log out
                </span>
              </button>
            </li>
          )}
          {authUser && (
            <li className='ProfileLink'>
              <Link id='link' to="/profile">
                <span>
                  <img src={ProfileImage} alt="Profile" />
                  Profile
                </span>
              </Link>
            </li>
          )}

          {authUser && (
            <li className='HPlink'>
            <Link id='link' to="/">
              <span>
                <img src={HomepageImage} alt="Homepage" />
                Homepage
              </span>
            </Link>
          </li>
        )}
          
         </ul>
       </nav>
      </div>
    </div>
  );
}
