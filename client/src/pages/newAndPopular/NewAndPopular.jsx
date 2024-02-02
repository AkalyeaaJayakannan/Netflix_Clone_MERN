import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import "./newAndPopular.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import ListItem from "../../components/listItem/ListItem";
import { UserContext } from "../../userContext/UserContext";
import { getUser } from "../../userContext/apiCalls";

const NewAndPopular = () => {
  // GET THE API KEY FROM .ENV FILE
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [lists, setLists] = useState(null);
  const { user, dispatch } = useContext(AuthContext);
  const { user: updatedUser, dispatch: userDispatch } = useContext(UserContext);

  // to get random lists
  useLayoutEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `${API_KEY}/api/lists/?type=newAndPopular`,
          {
            headers: {
              token: `Bearer ${
                JSON.parse(localStorage.getItem("user")).accessToken
              }`,
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, []);

  useEffect(() => {
    const getUpdatedUserForContext = async () => {
      getUser(user._id, userDispatch);
    };
    getUpdatedUserForContext();
  }, [userDispatch]);
  console.log(updatedUser);

  console.log(lists);

  return (
    <div className="listAndPopular">
      <Navbar />
      <div className="listContainer">
        {lists && lists.map((l, i) => <List index={i} list={l} key={l._id} />)}
      </div>
    </div>
  );
};

export default NewAndPopular;
