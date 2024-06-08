import { useState } from "react";
import PropTypes from "prop-types";

export const Counter = ({ text }) => {
  const [count, setCount] = useState(0);
  return (
    <div className="space-y-4">
      <button
        className="border border-stone-800 px-4 py-2 ring-2 ring-transparent hover:bg-stone-100 focus:ring-stone-700"
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </button>
      <p>{text}</p>
    </div>
  );
};

Counter.propTypes = {
  text: PropTypes.string,
}
