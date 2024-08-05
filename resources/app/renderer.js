document.addEventListener('DOMContentLoaded', () => {
    const calculator = document.querySelector('.calculator');
    const keys = calculator.querySelector('.keys');
    const display = calculator.querySelector('.current');
    
    let firstValue = '';
    let operator = '';
    let secondValue = '';
    let waitingForSecondValue = false;

    keys.addEventListener('click', event => {
        if (!event.target.matches('button')) return;

        const key = event.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        if (!action) {
            if (displayedNum === '0' || waitingForSecondValue) {
                display.textContent = keyContent;
                waitingForSecondValue = false;
            } else {
                display.textContent = displayedNum + keyContent;
            }
        }
        
        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            } else if (waitingForSecondValue) {
                display.textContent = '0.';
                waitingForSecondValue = false;
            }
        }

        if (action === 'clear') {
            firstValue = '';
            operator = '';
            secondValue = '';
            waitingForSecondValue = false;
            display.textContent = '0';
        }

        if (action === 'calculate') {
            if (firstValue && operator && !waitingForSecondValue) {
                secondValue = displayedNum;
                const result = window.calculator.add(parseFloat(firstValue), parseFloat(secondValue));
                display.textContent = result;
                firstValue = '';
                operator = '';
                secondValue = '';
                waitingForSecondValue = true;
            }
        }

        if (['+', '-', '×', '÷', '%'].includes(action)) {
            if (firstValue && operator && !waitingForSecondValue) {
                secondValue = displayedNum;
                const result = window.calculator.add(parseFloat(firstValue), parseFloat(secondValue));
                display.textContent = result;
                firstValue = result;
                secondValue = '';
                waitingForSecondValue = true;
            } else {
                firstValue = displayedNum;
                waitingForSecondValue = true;
            }
            operator = action;
        }
    });
});
