import PropTypes from "prop-types";
import { useQuestions } from "../QuestionsContext";

FinishScreen.propTypes = {
  maxPossiblePoints: PropTypes.number,
  points: PropTypes.number,
  highscore: PropTypes.number,
  dispatch: PropTypes.func,
};

function FinishScreen() {
  const { points, maxPossiblePoints, highscore, dispatch } = useQuestions();
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji} </span>
        You scored <strong>{points} </strong> out of {maxPossiblePoints} ({" "}
        {percentage}%)
      </p>
      <p className="highscore"> HighScore : {highscore} points </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
