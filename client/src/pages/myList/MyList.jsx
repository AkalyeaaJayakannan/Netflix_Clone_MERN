import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import "./myList.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import ListItem from "../../components/listItem/ListItem";
import { UserContext } from "../../userContext/UserContext";
import { getUser } from "../../userContext/apiCalls";

const MyList = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { user: updatedUser, dispatch: userDispatch } = useContext(UserContext);

  const [lists, setLists] = useState(updatedUser.myList);

  useLayoutEffect(() => {
    console.log("hello from effect with 2");
    getUser(user._id, userDispatch);
    setLists(updatedUser.myList);
    console.log(updatedUser);
  }, []);

  useLayoutEffect(() => {
    console.log("hello from effect with 1");
    // getUser(user._id, userDispatch);
    setLists(updatedUser.myList);
    console.log(updatedUser);
  }, [updatedUser]);

  console.log(updatedUser);

  return (
    <div className="myList">
      <Navbar />
      <div className="myListGridContainer">
        <h3>My List</h3>
        <div className="itemsGridContainer">
          {lists.length >= 1 ? (
            lists.map((listItem, i) => (
              <ListItem
                className="listItem"
                index={i}
                item={listItem}
                key={listItem}
              />
            ))
          ) : (
            <span className="noListText">Oops! No list found!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyList;
