import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import "./search.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import ListItem from "../../components/listItem/ListItem";
import { UserContext } from "../../userContext/UserContext";
import { getUser } from "../../userContext/apiCalls";
import { useLocation } from "react-router-dom";

const Search = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { user: updatedUser, dispatch: userDispatch } = useContext(UserContext);
  const [lists, setLists] = useState(null);

  const location = useLocation().state;
  const searchTerm = location.searchTerm;

  useLayoutEffect(() => {
    const getMovieByName = async () => {
      const res = await axios.get(`/api/movies/search/${searchTerm}`, {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      });
      setLists([...res.data]);
    };
    getMovieByName();
    console.log(lists);
  }, [searchTerm]);

  console.log(lists);
  console.log(searchTerm.split(" "));

  return (
    <div className="myList">
      <Navbar />
      <div className="myListGridContainer">
        {/* <h3>My List</h3> */}
        <div className="itemsGridContainer">
          {lists && lists.length >= 1 ? (
            lists.map((listItem, i) => (
              <ListItem
                className="listItem"
                index={i}
                item={listItem._id}
                key={listItem}
              />
            ))
          ) : (
            <span className="noListText">Oops! No item found!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
