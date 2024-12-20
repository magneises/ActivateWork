
const mortgageAmountInput = document.querySelector('#mortgage-amount');
const mortgageTermInput = document.querySelector('#mortgage-term');
const interestRateInputt = document.querySelector('#interest-rate');
const repaymentInput = document.querySelector('#repayment');
const interestOnlyInput = document.querySelector('#interest-only');
const clearAllClick = document.querySelector('#clear-all');
const calculatePaymentsClick = document.querySelector('#btn-calculate-payments');

mortgageAmountInput.addEventListener('input', () => {
    console.log(mortgageAmountInput.value);
});

mortgageTermInput.addEventListener('input', () => {
    console.log(mortgageAmountInput.value);
});

interestRateInputt.addEventListener('input', () => {
    console.log(interestRateInputt.value);
});

repaymentInput.addEventListener('input', () => {
    console.log(repaymentInput.value);
});

interestOnlyInput.addEventListener('input', () => {
    console.log(interestOnlyInput.value);
})

clearAllClick.addEventListener('click', () => {
    console.log("Clear All Button");
});

calculatePaymentsClick.addEventListener('click', () => {
    console.log("Calculate payments Button");
});





