import React, { Fragment, useEffect, useState } from "react";

const QuizOver = React.forwardRef((props, ref) => {
  const [asked, setAsked] = useState([]);
  useEffect(() => {
    setAsked(ref.current);
  }, [ref]);

  return (
    <Fragment>
      <div className="stepsBtnContainer">
        <p className="successMsg">Vous avez reussit ce niveau !</p>
        <button className="btnResult success">Next Level</button>
      </div>
      <div className="percentage">
        <div className="progressPercent">Reussite: 10%</div>
        <div className="progressPercent">Note: 1</div>
      </div>
      <hr />
      <p>Recapitulatif</p>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Questions</th>
              <th>Reponses</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>
            {asked.map((e) => (
              <tr key={e.id}>
                <td>{e.question}</td>
                <td>{e.answer}</td>
                <td>
                  <button className="btnInfo">More</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
});

export default React.memo(QuizOver);
