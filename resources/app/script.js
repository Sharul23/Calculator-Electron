// script.js

document.addEventListener('DOMContentLoaded', () => {
    const displayHistory = document.querySelector('.history');
    const displayResult = document.querySelector('.result');
    let currentInput = '';
    let history = '';

    const operators = ['+', '-', '*', '/'];
    const functions = ['rad', 'deg', 'square', 'percent', 'inverse', 'sin', 'cos', 'power', 'exp', 'ln', 'log', 'pi', 'e'];
    let lastFunction = '';

    function updateDisplay() {
        displayHistory.textContent = history;
        displayResult.textContent = currentInput || '0';
    }

    function calculate() {
        try {
            const result = eval(currentInput); // Simple evaluation of the expression
            currentInput = result.toString();
            history += ' = ' + currentInput;
            updateDisplay();
        } catch (error) {
            displayResult.textContent = 'Error';
        }
    }

    function handleFunction(func) {
        const value = {
            'rad': Math.PI / 180,
            'deg': 180 / Math.PI,
            'square': (x) => Math.pow(x, 2),
            'percent': (x) => x / 100,
            'inverse': (x) => 1 / x,
            'sin': (x) => Math.sin(x),
            'cos': (x) => Math.cos(x),
            'power': (x, y) => Math.pow(x, y),
            'exp': (x) => Math.exp(x),
            'ln': (x) => Math.log(x),
            'log': (x) => Math.log10(x),
            'pi': Math.PI,
            'e': Math.E
        };

        if (func === 'pi' || func === 'e') {
            currentInput += value[func];
        } else if (func === 'square') {
            currentInput = `Math.pow(${currentInput}, 2)`;
        } else if (func === 'power') {
            lastFunction = func;
        } else if (func === 'inverse') {
            currentInput = `1/${currentInput}`;
        } else if (functions.includes(func)) {
            currentInput = `${value[func]}(${currentInput})`;
        }

        updateDisplay();
    }

    document.querySelector('.keys').addEventListener('click', (event) => {
        const target = event.target;

        if (!target.classList.contains('btn')) return;

        const action = target.getAttribute('data-action');
        const func = target.getAttribute('data-function');
        const operator = target.getAttribute('data-operator');

        if (target.classList.contains('number')) {
            currentInput += target.textContent;
        } else if (action === 'clear') {
            currentInput = '';
            history = '';
        } else if (action === 'decimal') {
            if (!currentInput.includes('.')) {
                currentInput += '.';
            }
        } else if (action === 'parenthesis') {
            currentInput += target.textContent;
        } else if (action === 'calculate') {
            if (lastFunction) {
                currentInput = `${lastFunction === 'power' ? 'Math.pow' : 'Math.'}${lastFunction}(${currentInput})`;
                lastFunction = '';
            }
            calculate();
        } else if (operator) {
            currentInput += ` ${operator} `;
        } else if (func) {
            handleFunction(func);
        }

        updateDisplay();
    });
});
