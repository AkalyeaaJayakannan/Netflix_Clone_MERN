import { ArrowBackOutlined } from "@material-ui/icons";
import "./watch.scss";
// import media from "../../assets/media.mp4";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Watch() {
  const location = useLocation();
  const movie = location.state.movie;

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className="video"
        autoPlay={true}
        controls={true}
        src={movie.video}
      />
    </div>
  );
}
