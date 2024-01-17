import React, { useContext } from "react";
import "./app.scss";
import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./authContext/AuthContext";
import MyList from "./pages/myList/MyList";
import NewAndPopular from "./pages/newAndPopular/NewAndPopular";
import Search from "./pages/search/Search";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Navigate to="/register" />}
          />

          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />

          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />

          <Route
            path="/movies"
            element={
              user ? <Home type="movies" /> : <Navigate to="/register" />
            }
          />

          <Route
            path="/series"
            element={
              user ? <Home type="series" /> : <Navigate to="/register" />
            }
          />

          <Route
            path="/newandpopular"
            element={user ? <NewAndPopular /> : <Navigate to="/register" />}
          />

          <Route
            path="/mylist"
            element={user ? <MyList /> : <Navigate to="/register" />}
          />

          <Route
            path="/search"
            element={user ? <Search /> : <Navigate to="/register" />}
          />

          <Route
            path="/watch"
            element={user ? <Watch /> : <Navigate to="/register" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
