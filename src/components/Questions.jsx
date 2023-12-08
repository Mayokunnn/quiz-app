import PropTypes from "prop-types";
// import Option from "./Option";
import Options from "./Options";

Questions.propTypes = {
  question: PropTypes.object,
  dispatch: PropTypes.func,
  answer: PropTypes.number,
};

function Questions({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question} </h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Questions;
