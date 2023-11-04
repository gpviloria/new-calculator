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

    setDisp(result.toString());
    setNum1(result.toString());
    setOper(null);
    setNum2(null);
  }
}
