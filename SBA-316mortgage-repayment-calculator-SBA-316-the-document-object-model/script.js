
const mortgageAmountInput = document.querySelector('#mortgage-amount');
const mortgageTermInput = document.querySelector('#mortgage-term');
const interestRateInput = document.querySelector('#interest-rate');
const repaymentInput = document.querySelector('#repayment');
const interestOnlyInput = document.querySelector('#interest-only');
const clearAllClick = document.querySelector('#clear-all');
const calculatePaymentsClick = document.querySelector('#btn-calculate-payments');


// Event Listeners
mortgageAmountInput.addEventListener('input', () => {
    console.log(mortgageAmountInput.value);
});

mortgageTermInput.addEventListener('input', () => {
    console.log(mortgageTermInput.value);
});

interestRateInput.addEventListener('input', () => {
    console.log(interestRateInput.value);
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
    console.log(repaymentAmountFunction());
});

clearAllClick.addEventListener('click', () => {
    return clearAllFunction();
})


// Repayment Mortgage Type Calculation
const mortgageTypeRepaymentAmount = () => {
    const interestRate = parseFloat(interestRateInput.value) / 100;  // Convert percentage to decimal
    const mortgageAmount = parseFloat(mortgageAmountInput.value);
    const mortgageTerm = parseInt(mortgageTermInput.value, 10) * 12; // Convert years to months
    const monthlyInterestRate = interestRate / 12;  // Monthly interest rate
    const monthlyRepayment = (mortgageAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, mortgageTerm)) / (Math.pow(1 + monthlyInterestRate, mortgageTerm) - 1);
    return monthlyRepayment;
}


const mortgageTypeInterestOnlyAmount = () => {
    const mortgageAmount = parseFloat(mortgageAmountInput.value);
    const interestRate = parseFloat(interestRateInput.value) / 100; // Convert percentage to decimal
    const monthlyRepayment = mortgageAmount * interestRate;
    return monthlyRepayment;
}

function repaymentAmountFunction() {
    const mortgageType = repaymentInput.checked ? 'repayment' : 'interest-only';

    if (mortgageType === 'repayment') {
        const repaymentAmount = mortgageTypeRepaymentAmount();
        console.log(`Repayment Amount: ${repaymentAmount}`)
        return repaymentAmount;
    } else { //can use else since there's no other option
        const repaymentAmount = mortgageTypeInterestOnlyAmount();
        console.log(`Interest-only Repayment Amount: ${repaymentAmount}`)
        return repaymentAmount;
    }
}

function clearAllFunction() {
    mortgageAmountInput.value = '';
    mortgageTermInput.value = '';
    interestRateInput.value = '';
    repaymentInput.checked = false;
    interestOnlyInput.checked = false;
}





