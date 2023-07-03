import React, { Fragment, useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import Modal from "../Modal";
import axios from "axios";

const QuizOver = React.forwardRef(
  (
    { levelNames, score, maxQuestions, quizLevel, percent, loadNextLevel },
    ref
  ) => {
    const [asked, setAsked] = useState([]);
    useEffect(() => {
      setAsked(ref.current);
      if (localStorage.getItem("modifiedDate")) {
        if (
          Date.now >
          parseInt(localStorage.getItem("modifiedDate")) + 1296000000
        ) {
          localStorage.clear();
          localStorage.setItem("modifiedDate", Date.now());
        }
      }
    }, [ref]);
    const [dataRequest, setDataRequest] = useState(null);
    const [errorRequest, setErrorRequest] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [load, setLoad] = useState(false);
    const API_PUBLIC_KEY =
      process.env.REACT_API_KEY || "3c85e8513f64ab206d82c5ccfce77b5b";
    // const hash = "4badf55eb3486daec5030337d1b93842";

    // http://gateway.marvel.com/v1/public/characters?ts=0&apikey=REACT_API_KEY&hash=480b1c0fe671e61c9116cfd412e9550b

    const showModal = (heroId) => {
      setOpenModal(true);
      if (!localStorage.getItem(heroId)) {
        axios
          .get(
            `http://gateway.marvel.com/v1/public/characters/${heroId}?apikey=${API_PUBLIC_KEY}`
          )
          .then((response) => {
            setDataRequest(response.data);
            setLoad(true);
            console.log(response.data);
            localStorage.setItem(heroId, JSON.stringify(response.data));
            if (!localStorage.getItem("modifiedDate")) {
              localStorage.setItem("modifiedDate", Date.now());
            }
          })
          .catch((err) => {
            setErrorRequest(err);
            console.log(errorRequest);
          });
        console.log("From axios");
      } else {
        setLoad(true);
        setDataRequest(JSON.parse(localStorage.getItem(heroId)));
        console.log("From storage");
      }
    };

    const hiddeModal = () => {
      setOpenModal(false);
      setLoad(false);
    };

    const decision =
      score >= maxQuestions / 2 ? (
        quizLevel < levelNames.length ? (
          <>
            <p className="successMsg">Vous avez reussit ce niveau !</p>
            <button
              className="btnResult success"
              onClick={() => loadNextLevel(quizLevel)}
            >
              Next Level
            </button>
          </>
        ) : (
          <>
            <p className="successMsg">
              <FaTrophy size={"50px"} /> Vous avez terminer !
            </p>
            <button
              className="btnResult gameOver"
              onClick={() => loadNextLevel(0)}
            >
              Restart
            </button>
          </>
        )
      ) : (
        <>
          <p className="failureMsg">Vous avez pas reussit ce niveau !</p>
          <button
            className="btnResult gameOver"
            onClick={() => loadNextLevel(quizLevel)}
          >
            Restart
          </button>
        </>
      );

    const modalContent = load ? (
      <>
        <div className="modalHeader">
          <h2>{dataRequest.data.results[0].name}</h2>
        </div>
        <div className="modalBody">
          <div className="comicImage">
            <img
              src={
                dataRequest.data.results[0].thumbnail.path +
                "." +
                dataRequest.data.results[0].thumbnail.extension
              }
              alt={dataRequest.data.results[0].name}
            />
            {dataRequest.attributionText}
          </div>
          <div className="comicDetails">
            <h3>Description</h3>
            <p>
              {dataRequest.data.results[0].description === ""
                ? "Description non disponible"
                : dataRequest.data.results[0].description}
            </p>
            <h3>MORE DETAILS</h3>
            {dataRequest.data.results[0].urls &&
              dataRequest.data.results[0].urls.map((e, id) => (
                <a key={id} target="_blank" rel="noreferrer" href={e.url}>
                  {e.type.charAt(0).toLocaleUpperCase() + e.type.slice(1)}{" "}
                </a>
              ))}
          </div>
        </div>
        <div className="modalFooter">
          <button className="modalBtn" onClick={hiddeModal}>
            Close
          </button>
        </div>
      </>
    ) : (
      <>
        <div className="modalHeader">
          <h2>Reponse en attente ....</h2>
        </div>
        <div className="modalBody">
          <div className="loader"></div>
        </div>
        <div className="modalFooter">
          <button className="modalBtn">Close</button>
        </div>
      </>
    );
    return (
      <Fragment>
        <div className="stepsBtnContainer">{decision}</div>
        <div className="percentage">
          <div className="progressPercent">Reussite: {percent}%</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestions}
          </div>
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
              {score >= maxQuestions / 2 ? (
                asked.map((e) => (
                  <tr key={e.id}>
                    <td>{e.question}</td>
                    <td>{e.answer}</td>
                    <td>
                      <button
                        onClick={() => showModal(e.heroId)}
                        className="btnInfo"
                      >
                        More
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">
                    <div className="loader"></div>
                    <p style={{ textAlign: "center", color: "red" }}>
                      Rien a signaler
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Modal openModal={openModal} closeModal={hiddeModal}>
          {modalContent}
        </Modal>
      </Fragment>
    );
  }
);

export default React.memo(QuizOver);
