import { useEffect, useReducer } from "react";
// import PropTypes from "prop-types";
// import DateCou, nter from "./DateCounter";
import Error from "./Error";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function App() {
  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataFailed":
        return { ...state, status: "error" };
      case "start":
        return {
          ...state,
          status: "active",
          secondsRemaining: state.questions.length * SECS_PER_QUESTION,
        };
      case "newAnswer":
        // eslint-disable-next-line no-case-declarations
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            question.correctOption === action.payload
              ? state.points + question.points
              : state.points,
        };
      case "nextQuestion":
        return { ...state, index: state.index + 1, answer: null };
      case "finish":
        return {
          ...state,
          status: "finished",
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };
      case "restart":
        return {
          ...state,
          status: "ready",
          index: 0,
          answer: null,
          points: 0,
          secondsRemaining: 10,
        };
      case "tick":
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "finished" : state.status,
        };
      default:
        throw new Error("Action Unknown");
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;

  const numQuestions = questions.length;
  const curQuestion = questions.at(index);

  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        console.log(err.message);
        dispatch({ type: "dataFailed" });
      }
    }

    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsLength={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              questions={questions}
              index={index}
              points={points}
              answer={answer}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Questions
              dispatch={dispatch}
              question={curQuestion}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            maxPossiblePoints={maxPossiblePoints}
            points={points}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
