import React, { useState } from 'react';
import './App.css';

function CalcButton({ label, onClick, buttonClassName = "CalcButton" }) {
  return (
    <button className={buttonClassName} onClick={onClick}>
      {label}
    </button>
  );
}

function CalcDisplay({ display }) {
  return (
    <div className="CalcDisplay">
      {display}
    </div>
  );
}

export default function App() {
  const [disp, setDisp] = useState("0");
  const [num1, setNum1] = useState(null);
  const [oper, setOper] = useState(null);
  const [num2, setNum2] = useState(null);

  const numberClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    let num = value;
    if (oper === null) {
      if (num1 !== null) {
        num = num1 + num;
      }
      setNum1(num);
      setDisp(num);
    } else {
      if (num2 !== null) {
        num = num2 + num;
      }
      setNum2(num);
      setDisp(num);
    }
  }

  const operatorClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    // Replace "÷" with "/" for consistency
    const operator = value === '÷' ? '/' : value;

    setOper(operator);
    setDisp(operator);
  }

  const equalClickHandler = (e) => {
    e.preventDefault();

    if (num1 !== null && num2 !== null && oper !== null) {
      let result;

      const parsedNum1 = parseFloat(num1);
      const parsedNum2 = parseFloat(num2);

      switch (oper) {
        case "+":
          result = parsedNum1 + parsedNum2;
          break;
        case "-":
          result = parsedNum1 - parsedNum2;
          break;
        case "*":
          result = parsedNum1 * parsedNum2;
          break;
        case "/":
          if (parsedNum2 !== 0) {
            result = parsedNum1 / parsedNum2;
          } else {
            result = "ERROR: Division by zero";
          }
          break;
        case "^":
          result = Math.pow(parsedNum1, parsedNum2);
          break;
        case "%":
          result = parsedNum1 % parsedNum2;
          break;
        default:
          result = "ERROR";
      }

      // Format the result to have a fixed number of decimal places
      result = result.toFixed(2); // Adjust the number of decimal places as needed

      setDisp(result.toString());
      setNum1(result.toString());
      setOper(null);
      setNum2(null);
    }
  }

  const clearClickHandler = (e) => {
    e.preventDefault();

    setDisp("0");
    setNum1(null);
    setOper(null);
    setNum2(null);
  }

  const decimalClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (!disp.includes('.') && value === '.') {
      setDisp(disp + value);
      if (oper === null) {
        setNum1(num1 === null ? '0.' : num1 + value);
      } else {
        setNum2(num2 === null ? '0.' : num2 + value);
      }
    }
  }

  const negateClickHandler = (e) => {
    e.preventDefault();
    setDisp((parseFloat(disp) * -1).toString());
    if (oper === null) {
      setNum1((parseFloat(num1) * -1).toString());
    } else {
      setNum2((parseFloat(num2) * -1).toString());
    }
  }

  return (
    <div className="App">
      <div className="CalcContainer">
        <h1>New Calculator</h1>
        <CalcDisplay display={disp} />
        <div className="ButtonContainer">
          <CalcButton label={"^"} onClick={operatorClickHandler} />
          <CalcButton label={"%"} onClick={operatorClickHandler} />
          <CalcButton label={"±"} onClick={negateClickHandler} />
          <CalcButton label={"/"} onClick={operatorClickHandler} />
          <CalcButton label={7} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"} />
          <CalcButton label={8} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"} />
          <CalcButton label={9} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"} />
          <CalcButton label={"*"} onClick={operatorClickHandler} />
          <CalcButton label={4} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"} />
          <CalcButton label={5} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"} />
          <CalcButton label={6} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"} />
          <CalcButton label={"+"} onClick={operatorClickHandler} />
          <CalcButton label={1} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"} />
          <CalcButton label={2} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"} />
          <CalcButton label={3} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"} />
          <CalcButton label={"-"} onClick={operatorClickHandler} />
          <CalcButton label={"C"} onClick={clearClickHandler} />
          <CalcButton label={0} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"} />
          <CalcButton label={"."} onClick={decimalClickHandler} />
          <CalcButton label={"="} onClick={equalClickHandler} />
        </div>
      </div>
    </div>
  );
}
