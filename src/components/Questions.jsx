import PropTypes from "prop-types";
// import Option from "./Option";
import Options from "./Options";
import { useQuestions } from "../QuestionsContext";

Questions.propTypes = {
  question: PropTypes.object,
  dispatch: PropTypes.func,
  answer: PropTypes.number,
};

function Questions() {
  const { questions, dispatch, answer, index } = useQuestions();

  const question = questions[index];
  return (
    <div>
      <h4>{question.question} </h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Questions;
