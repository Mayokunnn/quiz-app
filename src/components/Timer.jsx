import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = Math.floor(secondsRemaining % 60);

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {`${mins}`.padStart(2, 0)}:{`${seconds}`.padStart(2, 0)}
    </div>
  );
}

export default Timer;
