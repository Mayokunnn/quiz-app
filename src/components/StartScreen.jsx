import PropTypes from "prop-types";
import { useQuestions } from "../QuestionsContext";

StartScreen.propTypes = {
  questionsLength: PropTypes.number,
  dispatch: PropTypes.func,
};

function StartScreen() {
  const { questionsLength, dispatch } = useQuestions();
  function handleClick() {
    dispatch({ type: "start" });
  }

  return (
    <div className="start ">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{questionsLength} Questions to test your React Mastery</h3>
      <button className="btn btn-ui " onClick={handleClick}>
        Let&lsquo;s Start!
      </button>
    </div>
  );
}

export default StartScreen;
