import React, { useRef, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const refWolver = useRef(null);
  useEffect(() => {
    refWolver.current.classList.add("startingImg");
    setTimeout(() => {
      refWolver.current.classList.remove("startingImg");
      setBtn(true);
    }, 1500);
  }, []);

  const [btn, setBtn] = useState(false);

  const setImage = (pos) => {
    refWolver.current.classList.add(pos + "Img");
  };

  const setLeaveImage = (pos) =>
    refWolver.current.classList.remove(pos + "Img");

  const btnElement = btn && (
    <Fragment>
      <div className="leftBox">
        <Link
          to="/signup"
          className="btn-welcome"
          onMouseOut={() => setLeaveImage("left")}
          onMouseOver={() => setImage("left")}
        >
          Inscription
        </Link>
      </div>
      <div className="rightBox">
        <Link
          to="/login"
          className="btn-welcome"
          onMouseOut={() => setLeaveImage("right")}
          onMouseOver={() => setImage("right")}
        >
          Connexion
        </Link>
      </div>
    </Fragment>
  );

  return (
    <main ref={refWolver} className="welcomePage">
      {btnElement}
    </main>
  );
};

export default Landing;
