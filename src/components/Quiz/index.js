import React from "react";
import {FaChevronRight} from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../quizMarvel";
import QuizOver from "../QuizOver";

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.initState = {
      levelNames: ["debutant", "confirme", "expert"],
      quizLevel: 0,
      quizEnd: false,
      maxQuestions: 10,
      storedQuestions: [],
      question: null,
      options: [],
      idQuestion: 9,
      btnDisabled: true,
      selectedAnswer: null,
      score: 7,
      showedWelcomemsg: false,
    };
    this.state = this.initState;
    this.storedDataRef = React.createRef();
  }

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
      this.setState({ maxQuestions: fetchedQuestions.length });
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

    if (
      this.props.userData !== null &&
      !this.state.showedWelcomemsg &&
      this.state.quizLevel === 0
    ) {
      this.showWelcomemsg(this.props.userData.pseudo);
      this.setState({ showedWelcomemsg: true });
    }

    if (this.state.quizEnd !== prevState.quizEnd) {
      const gradePercentage = this.getPercentage(
        this.state.maxQuestions,
        this.state.score
      );
      this.gameOver(gradePercentage);
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

  gameOver = (gradePercentage) => {
    if (gradePercentage >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: gradePercentage,
      });
    } else {
      this.setState({
        percent: gradePercentage,
      });
    }
  };

  setNextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      this.setState({ quizEnd: true });
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
  loadNextLevel = (quizLevel) => {
    this.setState({ ...this.initState, quizLevel });
    this.loadQuestions(this.state.levelNames[quizLevel]);
  };
  getPercentage = (maxQ, score) => (score / maxQ) * 100;
  render() {
    return this.state.quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={this.state.levelNames}
        score={this.state.score}
        maxQuestions={this.state.maxQuestions}
        quizLevel={this.state.quizLevel}
        percent={this.state.percent}
        loadNextLevel={this.loadNextLevel}
      />
    ) : (
      <div>
        <ToastContainer />

        <Levels activeStep={this.state.quizLevel} levels={this.state.levelNames} />
        <ProgressBar
          level={`${this.state.idQuestion + 1}/${
            this.state.storedQuestions.length
          }`}
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
            <FaChevronRight /> {option}
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
