import PropTypes from "prop-types";

Options.propTypes = {
  question: PropTypes.object,
  dispatch: PropTypes.func,
  answer: PropTypes.number,
};

function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${answer === i ? "answer" : ""} ${
            hasAnswered
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          } `}
          key={i + option}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
