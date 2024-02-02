import React, { useEffect, useLayoutEffect, useState } from "react";
import "./featured.scss";
import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import mediaImg from "../../assets/friendsPreview.jpg";
import mediaTitle from "../../assets/friendsName.webp";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Featured({ type, setGenre }) {
  // GET THE API KEY FROM .ENV FILE
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [movie, setMovie] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const getRandomMovie = async () => {
      try {
        const res = await axios.get(
          `${API_KEY}/api/movies/random?type=${type}`,
          {
            headers: {
              token: `Bearer ${
                JSON.parse(localStorage.getItem("user")).accessToken
              }`,
            },
          }
        );

        setMovie(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomMovie();
    console.log(movie);
  }, [type]);

  const watchHandler = (e) => {
    e.preventDefault();
    navigate("/watch", { state: { movie } });
  };

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movie" : "TV Shows"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="action">Action</option>
            <option value="childrenAndFamily">Children & Family</option>
            <option value="crime">Crime</option>
            <option value="comedy">Comedy</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="hollywood">Hollywood</option>
            <option value="horror">Horror</option>
            <option value="independant">Independant</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={movie.img} />
      <div className="featuredImg"></div>
      <div className="info">
        <img src={movie.imgSm} className="featuredTitle" />
        <span className="desc">{movie.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span onClick={watchHandler}>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
