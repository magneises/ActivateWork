
const mortgageAmountInput = document.querySelector('#mortgage-amount');
const mortgageTermInput = document.querySelector('#mortgage-term');
const interestRateInput = document.querySelector('#interest-rate');
const repaymentInput = document.querySelector('#repayment');
const interestOnlyInput = document.querySelector('#interest-only');
const clearAllClick = document.querySelector('#clear-all');
const calculatePaymentsClick = document.querySelector('#btn-calculate-payments');
const mortgageType = repaymentInput || interestOnlyInput;


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
    if (mortgageType === 'repaymnet') {
        const repaymentAmount = mortgageTypeRepaymentAmount();
        console.log(`Repayment Amount: ${repaymentAmount}`)
    } else { //can use else since there's no other option
        const repaymentAmount = mortgageTypeInterestOnlyAmount();
        console.log(`Interest-only Repayment Amount: ${repaymentAmount}`)
    }
}


// use an if function to decide to whether to use the repyament calc or the interest only calc.
// if (mortgageType ==== 'repayment') {
// }




