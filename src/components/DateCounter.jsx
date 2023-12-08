import { useReducer } from "react";

function DateCounter() {
  // const [count, setCount] = useState(0);

  const initialState = { count: 0, step: 1 };

  function reducer(state, action) {
    console.log(state, action);
    // if (action.type === "inc") return state + action.value;
    // if (action.type === "dec") return state - action.value;
    // if (action.type === "setCount") return action.value;

    switch (action.type) {
      case "dec":
        return { ...state, count: state.count - action.value };
      case "inc":
        return { ...state, count: state.count + action.value };
      case "setCount":
        return { ...state, count: action.value };
      case "setStep":
        return { ...state, step: action.value };
      case "reset":
        return initialState;
      default:
        throw new Error("Unknown action");
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  // const [step, setStep] = useState(1);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("december 1 2023");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec", value: step });

    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    // setCount((count) => count + 1);
    dispatch({ type: "inc", value: step });
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: "setCount", value: +e.target.value });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "setStep", value: +e.target.value });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
