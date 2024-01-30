import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import axios from "axios";
import { getUser } from "../../userContext/apiCalls";
import { UserContext } from "../../userContext/UserContext";
import { AuthContext } from "../../authContext/AuthContext";
import Footer from "../../components/footer/Footer";

const Home = ({ type }) => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  const { user, dispatch } = useContext(AuthContext);
  const { user: updatedUser, dispatch: userDispatch } = useContext(UserContext);

  // to get random lists
  useLayoutEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          // `/api/lists${type ? "?type=" + type : "/"}${
          //   genre ? "&genre=" + genre : ""
          // }`,
          `${API_KEY}/api/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
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
  }, [type, genre]);

  useEffect(() => {
    const getUpdatedUserForContext = async () => {
      getUser(user._id, userDispatch);
    };
    getUpdatedUserForContext();
  }, [userDispatch]);
  console.log(updatedUser);

  return (
    <div className="home">
      <Navbar setGenre={setGenre} />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list, i) => (
        <List list={list} key={list._id} />
      ))}
      <Footer />
    </div>
  );
};

export default Home;

// // //////////////////////////////////////////////////////////////////////////////////////////////////////////
// import Navbar from "../../components/navbar/Navbar";
// import Featured from "../../components/featured/Featured";
// import "./home.scss";
// import List from "../../components/list/List";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const Home = ({ type }) => {
//   const [lists, setLists] = useState([]);
//   const [genre, setGenre] = useState(null);

//   useEffect(() => {
//     const getRandomLists = async () => {
//       try {
//         const res = await axios.get(
//           `lists${type ? "?type=" + type : ""}${
//             genre ? "&genre=" + genre : ""
//           }`,
//           {
//             headers: {
//               token:
//                 "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjY0ZDE4NjhjODQ3MzZhN2U2ODczNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NzQ0OTg0OCwiZXhwIjoxNjk3ODgxODQ4fQ.5nNOPcR1zGR3tFuDojBc0eCa6A1Opkdd6SVmU_UsXYY",
//             },
//           }
//         );
//         console.log(res);
//         setLists(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getRandomLists();
//   }, [type, genre]);

//   return (
//     <div className="home">
//       <Navbar />
//       <Featured type={type} setGenre={setGenre} />
//       {lists.map((list) => (
//         <List list={list} />
//       ))}
//     </div>
//   );
// };

// export default Home;
