import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // Handle cases where user might be null
  if (!user) {
    return (
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Dracosocial</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for friend, post or video"
              className="searchInput"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconPage">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconPage">2</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconPage">1</span>
            </div>
          </div>
          {/* Placeholder image if user is not logged in */}
          <img
            src={PF + "persons/1.jpg"}
            alt="Default Avatar"
            className="topbarImg"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Dracosocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconPage">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconPage">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconPage">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "persons/1.jpg"
            }
            alt="User Avatar"
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
