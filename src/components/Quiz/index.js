import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../quizMarvel";
import QuizOver from "../QuizOver";

class Quiz extends React.Component {
  state = {
    levelNames: ["debutant", "confirme", "expert"],
    quizLevel: 0,
    quizEnd: false,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    selectedAnswer: null,
    score: 0,
    showedWelcomemsg: false,
  };

  storedDataRef = React.createRef();

  loadQuestions = (level) => {
    const fetchedQuestions = QuizMarvel[0].quizz[level];
    if (fetchedQuestions.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedQuestions;
      const questionsWithoutAnswer = fetchedQuestions.map(
        ({ answer, ...rest }) => rest
      );
      this.setState({
        storedQuestions: questionsWithoutAnswer,
      });
    } else {
      this.setState({maxQuestions:fetchedQuestions.length})
    }
  };
  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }
    if (this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        btnDisabled: true,
        selectedAnswer: null,
      });
    }
    
    if (this.props.userData !== null && !this.state.showedWelcomemsg) {
      this.showWelcomemsg(this.props.userData.pseudo);
      this.setState({ showedWelcomemsg: true });
    }
  }
  submitAnswer = (selectedAnswer) => {
    this.setState({ btnDisabled: false, selectedAnswer });
  };

  showWelcomemsg = (pseudo) =>
    toast.warn(`Hey ${pseudo}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });

  gameOver = () => {
    this.setState({
      quizEnd: true,
    });
  };

  setNextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      this.gameOver();
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1,
      }));
    }
    const questionAnswer =
      this.storedDataRef.current[this.state.idQuestion].answer;
    if (questionAnswer === this.state.selectedAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));
      toast.success(`Won +1`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    } else {
      toast.error(`Unlucky `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }
  };
  render() {
    return !this.state.quizEnd ? (
      <QuizOver ref={this.storedDataRef}/>
    ) : (
      <div>
        <ToastContainer />

        <Levels />
        <ProgressBar
          level={`${this.state.idQuestion}/${this.state.storedQuestions.length}`}
          progression={
            (this.state.idQuestion * 100) / this.state.storedQuestions.length
          }
        />
        <h2>{this.state.question}</h2>
        {this.state.options.map((option, index) => (
          <p
            key={index}
            className={`answerOptions ${
              this.state.selectedAnswer === option && "selected"
            }`}
            onClick={() => this.submitAnswer(option)}
          >
            {option}
          </p>
        ))}

        <button
          className="btnSubmit"
          onClick={this.setNextQuestion}
          disabled={this.state.btnDisabled}
        >
          {this.state.idQuestion === this.state.maxQuestions - 1
            ? "Terminer"
            : "Suivant"}
        </button>
      </div>
    );
  }
}

export default Quiz;
