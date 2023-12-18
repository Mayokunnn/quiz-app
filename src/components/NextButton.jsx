import PropTypes from "prop-types";
import { useQuestions } from "../QuestionsContext";

NextButton.propTypes = {
  dispatch: PropTypes.func,
  answer: PropTypes.number,
  index: PropTypes.number,
  numQuestions: PropTypes.number,
};

function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuestions();
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
