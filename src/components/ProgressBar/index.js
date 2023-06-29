import React, { Fragment } from "react";

const ProgressBar = (props) => {
  return (
    <Fragment>
      <div className="percentage">
        <div className="progressPercent">Question: {props.level}</div>
        <div className="progressPercent">Progression: {props.progression}%</div>
      </div>
      <div className="progressBar">
        <div className="progressBarChange" style={{ width: `${props.progression}%` }}></div>
      </div>
    </Fragment>
  );
};

export default ProgressBar;
