// script.js

function clearDisplay() {
    document.getElementById('display').textContent = '0';
  }
  
  function appendNumber(number) {
    const display = document.getElementById('display');
    if (display.textContent === '0') {
      display.textContent = number;
    } else {
      display.textContent += number;
    }
  }
  
  function appendOperator(operator) {
    const display = document.getElementById('display');
    display.textContent += operator;
  }
  
  function calculateResult() {
    const display = document.getElementById('display');
    try {
      display.textContent = eval(display.textContent);
    } catch (e) {
      display.textContent = 'Error';
    }
  }