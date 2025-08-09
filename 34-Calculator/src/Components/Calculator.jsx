import { useState, useEffect } from "react";
// import "./Calculator.css";

export default function Calculator() {
  const [input, setInput] = useState("0");
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("calc_history")) || []);

  useEffect(() => {
    localStorage.setItem("calc_history", JSON.stringify(history));
  }, [history]);

  const handleClick = (value) => {
    if (input === "0" && value !== ".") {
      setInput(value);
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleClear = () => {
    setInput("0");
  };

  const handleCalculate = () => {
    try {
      const result = eval(input);
      setHistory([{ expression: input, result }, ...history.slice(0, 9)]);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="calculator dark-theme">
      <div className="title-bar">
        <span className="circle red"></span>
        <span className="circle yellow"></span>
        <span className="circle green"></span>
      </div>

      <div className="display">{input}</div>

      <div className="buttons">
        <button className="btn-light" onClick={handleClear}>AC</button>
        <button className="btn-light" onClick={() => setInput(input.slice(0, -1) || "0")}>⌫</button>
        <button className="btn-light" onClick={() => handleClick("%")}>%</button>
        <button className="btn-orange" onClick={() => handleClick("/")}>÷</button>

        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button className="btn-orange" onClick={() => handleClick("*")}>×</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button className="btn-orange" onClick={() => handleClick("-")}>−</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button className="btn-orange" onClick={() => handleClick("+")}>+</button>

        <button className="span-two" onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick(".")}>.</button>
        <button className="btn-orange" onClick={handleCalculate}>=</button>
      </div>

      <div className="history">
        <div className="history-header">
          <h3>History</h3>
          {history.length > 0 && (
            <button className="clear-history-btn" onClick={handleClearHistory}>
              Clear
            </button>
          )}
        </div>
        <ul>
          {history.length > 0 ? (
            history.map((item, idx) => (
              <li key={idx} onClick={() => setInput(item.result.toString())}>
                <span className="expression">{item.expression}</span>
                <span className="result">= {item.result}</span>
              </li>
            ))
          ) : (
            <li className="empty-history">No history yet</li>
          )}
        </ul>
      </div>
    </div>
  );
}
