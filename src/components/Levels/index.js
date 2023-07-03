import React from "react";
import Stepper from "react-stepper-horizontal";


const Levels = (props) => {
  return (
    <div className="levelsContainer" style={{ background: "transparent" }}>
      <Stepper
        steps={props.levels.map((e) => ({ title: e.toUpperCase() }))}
        circleTop={0}
        activeTitleColor={"#d31017"}
        activeColor={"#d31017"}
        completeTitleColor={"#363636"}
        completeColor={"#d31017"}
        completeBarColor={"#d31017"}
        size={45}
        activeStep={props.activeStep}
      />
    </div>
  );
};

export default Levels;
