import PropTypes from "prop-types";
import { useQuestions } from "../QuestionsContext";

Progress.propTypes = {
  questions: PropTypes.array,
  index: PropTypes.number,
  points: PropTypes.number,
  answer: PropTypes.number,
  maxPossiblePoints: PropTypes.number,
};

function Progress() {
  const { questions, index, points, answer, maxPossiblePoints } =
    useQuestions();
  const numQuestions = questions.length;
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}{" "}
      </p>
      <p>
        <strong>{points}</strong> /{maxPossiblePoints} points
      </p>
    </header>
  );
}

export default Progress;
