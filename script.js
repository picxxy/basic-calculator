const screen = document.querySelector('#screen');
const keys = document.querySelector('.calculator-keys');
let currentInput = '';
let previousInput = '';
let operator = '';

keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(value);
            break;
        case '=':
            calculate();
            break;
        case 'all-clear':
            clear();
            break;
        case '.':
            addDecimal();
            break;
        default:
            addNumber(value);
            break;
    }
});

function addNumber(number) {
    if (currentInput.length < 12) {
        currentInput = currentInput === '0' ? number : currentInput + number;
        screen.value = currentInput;
    }
}

function addDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        screen.value = currentInput;
    }
}

function handleOperator(nextOperator) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = nextOperator;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result = '';
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    screen.value = currentInput;
}

function clear() {
    currentInput = '';
    previousInput = '';
    operator = '';
    screen.value = '';
}
