import React, { useContext, useState } from "react";
import "./navbar.scss";
import { ArrowDropDown, Menu, Notifications, Search } from "@material-ui/icons";
import Profile from "../../assets/profile.jpg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Home from "../../pages/home/Home";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/apiCalls";

const Navbar = ({ setGenre }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchIconClicked, setSearchIconClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hamNavActive, setHamNavActive] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const searchHandler = (searchTerm) => {
    console.log(searchTerm);
    navigate("/search", { state: { searchTerm: searchTerm } });
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div
        className={`container lrgScrnContainer ${
          hamNavActive ? "openHamNav" : ""
        }`}
      >
        <div className="left lrgScrnLeft">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="Netflix logo"
            onClick={(e) => {
              navigate("/");
              setGenre(null);
            }}
          />

          <div className="browseLinkWrapper">
            <span className="browseDropdown">
              Browse
              <ArrowDropDown />
            </span>
            <div className="navLinksContainer">
              <Link to="/" className="link" onClick={(e) => setGenre(null)}>
                <span>Home</span>
              </Link>
              <Link to="/series" className="link">
                <span>TV Shows</span>
              </Link>
              <Link to="/movies" className="link">
                <span>Movies</span>
              </Link>
              <Link to="/newandpopular" className="link">
                <span>New and Popular</span>
              </Link>
              <Link to="/mylist" className="link">
                <span>My List</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="right lrgScrnRight">
          <div className="searchContainer">
            {!searchIconClicked ? (
              <Search
                className="icons"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("search clicked");
                  setSearchIconClicked(true);
                }}
              />
            ) : (
              <div className="searchInputContainer">
                <Search
                  className="icons searchInsideInput"
                  onClick={(e) => {
                    e.preventDefault();
                    searchHandler(searchTerm);
                  }}
                />
                <input
                  className="searchInput"
                  type="text"
                  placeholder="Search for a movie..."
                  // value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* <span>KID</span> */}
          <Notifications className="icons" />
          <img src={user.profilePic} alt="Profile path" />
          <div className="profile">
            <ArrowDropDown className="icons dropdownIcon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={(e) => logout(dispatch)}>Logout</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mdScrnContainer">
        <div className="left mdScrnLeft">
          <Menu
            className="hamMenuIcon"
            onClick={(e) => {
              console.log(hamNavActive);
              setHamNavActive(!hamNavActive);
            }}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="Netflix logo"
            onClick={(e) => {
              navigate("/");
              setGenre(null);
            }}
          />
        </div>
        <div className="right mdScrnRight">
          <div className="searchContainer">
            {!searchIconClicked ? (
              <Search
                className="icons"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("search clicked");
                  setSearchIconClicked(true);
                }}
              />
            ) : (
              <div className="searchInputContainer">
                <Search
                  className="icons searchInsideInput"
                  onClick={(e) => {
                    e.preventDefault();
                    searchHandler(searchTerm);
                  }}
                />
                <input
                  className="searchInput"
                  type="text"
                  placeholder="Search for a movie..."
                  // value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
