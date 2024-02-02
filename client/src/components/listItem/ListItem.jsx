// import "./listItem.scss";
// import {
//   PlayArrow,
//   Add,
//   ThumbUpAltOutlined,
//   ThumbDownOutlined,
// } from "@material-ui/icons";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function ListItem({ index, item }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [movie, setMovie] = useState({});

//   useEffect(() => {
//     const getMovie = async () => {
//       try {
//         const res = await axios.get("/movies/find/" + item, {
//           headers: {
//             token:
//               "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
//           },
//         });
//         setMovie(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMovie();
//   }, [item]);

//   return (
//     <Link to={{ pathname: "/watch", movie: movie }}>
//       <div
//         className="listItem"
//         style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <img src={movie?.imgSm} alt="" />
//         {isHovered && (
//           <>
//             <video src={movie.trailer} autoPlay={true} loop />
//             <div className="itemInfo">
//               <div className="icons">
//                 <PlayArrow className="icon" />
//                 <Add className="icon" />
//                 <ThumbUpAltOutlined className="icon" />
//                 <ThumbDownOutlined className="icon" />
//               </div>
//               <div className="itemInfoTop">
//                 <span>{movie.duration}</span>
//                 <span className="limit">+{movie.limit}</span>
//                 <span>{movie.year}</span>
//               </div>
//               <div className="desc">{movie.desc}</div>
//               <div className="genre">{movie.genre}</div>
//             </div>
//           </>
//         )}
//       </div>
//     </Link>
//   );
// }

///////////////////////////////////////////////
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./listItem.scss";
// import media from "../../assets/media.mp4";
import {
  Add,
  Done,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import itemImg from "../../assets/friends.webp";
import axios from "axios";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Watch from "../../pages/watch/Watch";
import { AuthContext } from "../../authContext/AuthContext";
import { getUser, updateUser } from "../../userContext/apiCalls";
// import { getUser } from "../../authContext/apiCalls";
import { UserContext } from "../../userContext/UserContext";

function ListItem({ index, item, listItemRef, setWidth }) {
  // GET THE API KEY FROM .ENV FILE
  const API_KEY = process.env.REACT_APP_API_KEY;

  const navigate = useNavigate();
  const location = useLocation();

  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const { user, dispatch } = useContext(AuthContext);
  const { user: updatedUser, dispatch: userDispatch } = useContext(UserContext);
  const [isInMyList, setIsInMyList] = useState(
    updatedUser?.myList?.includes(item)
  );
  const [needMaxCick, setNeedMaxClick] = useState(false);
  // const listItemRef = useRef();

  // // getUpdatedUserData();
  useLayoutEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(`${API_KEY}/api/movies/find/` + item, {
          headers: {
            token: `Bearer ${
              JSON.parse(localStorage.getItem("user")).accessToken
            }`,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item, user._id]);

  const itemWatchHandler = () => {
    navigate("/watch", { state: { movie } });
  };

  // to add item to myList
  const addItemToMyListHandler = async (e) => {
    e.preventDefault();
    console.log("I am adding the item");
    console.log(item);

    // add item to mylist in user using api
    try {
      console.log(updatedUser);
      console.log(updatedUser._id);
      console.log(updatedUser.myList);

      console.log(updatedUser);
      const updatedList = await [...updatedUser.myList, item];
      await updateUser(user._id, { myList: updatedList }, userDispatch);

      setIsInMyList(true);
    } catch (error) {
      console.error("Error updating the user:", error);
      // Handle error, show a message, or retry
    }
  };

  const removeItemToMyListHandler = async (e) => {
    e.preventDefault();
    console.log("I am removing the item");
    console.log(item);

    // to remove item from myList using api
    try {
      console.log(updatedUser);
      const updatedList = await [
        ...updatedUser.myList.filter((i) => i !== item),
      ];
      console.log(updatedList);
      await updateUser(user._id, { myList: updatedList }, userDispatch);
      setIsInMyList(false);
    } catch (err) {
      console.log("Error updating the user", err);
    }
  };

  useLayoutEffect(() => {
    if (location.pathname !== "/mylist" || location.pathname !== "/search") {
      setNeedMaxClick(true);
    }
  }, [location]);

  // to set the width of the listItem
  useEffect(() => {
    if (needMaxCick) {
      if (listItemRef.current) {
        setWidth(listItemRef.current.offsetWidth);
        console.log(listItemRef.current.offsetWidth);
      }
      console.log(listItemRef);
    }
  }, [setWidth]);

  console.log(location);
  return (
    <div
      className="listItem"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={listItemRef}
    >
      <div className="listItemWrapper">
        <img src={movie.imgTitle} />

        {isHovered && (
          <div className="container">
            {!isHovered ? (
              <img src={movie.img} />
            ) : (
              <video
                src={movie.trailer}
                autoPlay
                loop
                onClick={itemWatchHandler}
              ></video>
            )}

            <div className="info">
              <div className="buttons">
                <PlayArrow className="icons" onClick={itemWatchHandler} />
                {isInMyList ? (
                  <Done className="icons" onClick={removeItemToMyListHandler} />
                ) : (
                  <Add className="icons" onClick={addItemToMyListHandler} />
                )}
                <ThumbUpAltOutlined className="icons" />
                <ThumbDownAltOutlined className="icons" />
              </div>
              <div className="text">
                <span>{movie.duration}</span>
                <span className="ageLimit">{movie.limit}+</span>
                <span>{movie.year}</span>
              </div>
              <p className="description">{movie.desc}</p>
              <div className="genre">
                <span>{movie.genre}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListItem;
