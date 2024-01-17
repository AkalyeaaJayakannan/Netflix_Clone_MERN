import React, { useEffect, useRef, useState } from "react";
import "./list.scss";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { Hidden } from "@material-ui/core";
import ListItem from "../listItem/ListItem";

function List({ list }) {
  const [isMoved, setIsMoved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef();
  const listItemRef = useRef();
  const [listItemWidth, setListItemWidth] = useState();
  const [clickLimit, setClickLimit] = useState(null);

  const handleLeftClick = () => {
    if (
      parseInt(
        window
          .getComputedStyle(sliderRef.current)
          .getPropertyValue("--slider-index")
      ) > 0
    ) {
      setIsMoved(true);
      sliderRef.current.style.setProperty(
        "--slider-index",
        parseInt(
          window
            .getComputedStyle(sliderRef.current)
            .getPropertyValue("--slider-index")
        ) - 1
      );
    }
  };

  const handleRightClick = () => {
    if (
      parseInt(
        window
          .getComputedStyle(sliderRef.current)
          .getPropertyValue("--slider-index")
      ) < clickLimit
    ) {
      setIsMoved(true);
      sliderRef.current.style.setProperty(
        "--slider-index",
        parseInt(
          window
            .getComputedStyle(sliderRef.current)
            .getPropertyValue("--slider-index")
        ) + 1
      );
    }
  };
  console.log(window.innerWidth);
  useEffect(() => {
    console.log("trying to get the listItem's width");
    console.log(listItemWidth);

    console.log("the useEffect to get the listItem width is working");
    setClickLimit(Math.round(10 - window.innerWidth / 250) + 1);
    // console.log(window.innerWidth / listItemRef.current.offsetWidth);
  }, [listItemWidth]);

  

  return (
    <div className="list">
      <h3 className="listTitle">{list.title}</h3>
      <div
        className="wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className="handle leftHandle"
          onClick={handleLeftClick}
          style={{ visibility: isMoved && isHovered ? "visible" : "hidden" }}
        >
          <div className="text">
            <ArrowBackIosOutlined className="handleMoveIcon" />
          </div>
        </button>
        <div className="slider" ref={sliderRef}>
          {list.content.map((item, i) => (
            <ListItem
              className="listItem"
              index={i}
              item={item}
              key={item._id}
              listItemRef={listItemRef}
              setWidth={setListItemWidth}
            />
          ))}
        </div>
        <button className="handle rightHandle" onClick={handleRightClick}>
          <div className="text">
            <ArrowForwardIosOutlined />
          </div>
        </button>
      </div>
    </div>
  );
}

export default List;

// /////////////////////////////////////////////////////////

// import {
//   ArrowBackIosOutlined,
//   ArrowForwardIosOutlined,
// } from "@material-ui/icons";
// import { useRef, useState } from "react";
// import ListItem from "../listItem/ListItem";
// import "./list.scss";

// export default function List({ list }) {
//   const [isMoved, setIsMoved] = useState(false);
//   const [slideNumber, setSlideNumber] = useState(0);
//   const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);

//   const listRef = useRef();

//   const handleClick = (direction) => {
//     setIsMoved(true);
//     let distance = listRef.current.getBoundingClientRect().x - 50;
//     if (direction === "left" && slideNumber > 0) {
//       setSlideNumber(slideNumber - 1);
//       listRef.current.style.transform = `translateX(${230 + distance}px)`;
//     }
//     if (direction === "right" && slideNumber < 10 - clickLimit) {
//       setSlideNumber(slideNumber + 1);
//       listRef.current.style.transform = `translateX(${-230 + distance}px)`;
//     }
//   };
//   return (
//     <div className="list">
//       <span className="listTitle">{list.title}</span>
//       <div className="wrapper">
//         <ArrowBackIosOutlined
//           className="sliderArrow left"
//           onClick={() => handleClick("left")}
//           style={{ display: !isMoved && "none" }}
//         />
//         <div className="container" ref={listRef}>
//           {list.content.map((item, i) => (
//             <ListItem index={i} item={item} />
//           ))}
//         </div>
//         <ArrowForwardIosOutlined
//           className="sliderArrow right"
//           onClick={() => handleClick("right")}
//         />
//       </div>
//     </div>
//   );
// }
