// Variable Declarations
const mortgageAmountInput = document.querySelector('#mortgage-amount');
const mortgageTermInput = document.querySelector('#mortgage-term');
const interestRateInput = document.querySelector('#interest-rate');
const repaymentInput = document.querySelector('#repayment');
const interestOnlyInput = document.querySelector('#interest-only');
const clearAllClick = document.querySelector('#clear-all');
const calculatePaymentsClick = document.querySelector('#btn-calculate-payments');
const calcImg = document.querySelector('.calc-image');


// Event Listeners
mortgageAmountInput.addEventListener('input', () => {
    console.log(`Mortgage Amount: ${mortgageAmountInput.value}`);
});

mortgageTermInput.addEventListener('input', () => {
    console.log(`Mortgage Term: ${mortgageTermInput.value}`);
});

interestRateInput.addEventListener('input', () => {
    console.log(`Interest Rate: ${interestRateInput.value}`);
});

clearAllClick.addEventListener('click', clearAllFunction);

calculatePaymentsClick.addEventListener('click', () => {
    console.log(repaymentAmountFunction());
});

// Repayment Mortgage Type Calculation
const mortgageTypeRepaymentAmount = () => {
    const interestRate = parseFloat(interestRateInput.value) / 100; // Convert percentage to decimal
    const mortgageAmount = parseFloat(mortgageAmountInput.value);
    const mortgageTerm = parseInt(mortgageTermInput.value, 10) * 12; // Convert years to months
    const monthlyInterestRate = interestRate / 12; // Monthly interest rate
    const monthlyRepayment = 
        (mortgageAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, mortgageTerm)) / 
        (Math.pow(1 + monthlyInterestRate, mortgageTerm) - 1);
    return monthlyRepayment.toFixed(2); // Format to 2 decimal places
};

// Interest Only Calculation
const mortgageTypeInterestOnlyAmount = () => {
    const mortgageAmount = parseFloat(mortgageAmountInput.value);
    const interestRate = parseFloat(interestRateInput.value) / 100; // Convert percentage to decimal
    const monthlyRepayment = mortgageAmount * interestRate;
    return monthlyRepayment.toFixed(2); // Format to 2 decimal places
};

// Repayment Decision Function
function repaymentAmountFunction() {
    const mortgageType = repaymentInput.checked ? 'repayment' : 'interest-only';

    if (mortgageType === 'repayment') {
        const repaymentAmount = mortgageTypeRepaymentAmount();
        console.log(`Repayment Amount: ${repaymentAmount}`);
        removeCalcImg();
        yourResultsTextUpdate();
        displayResultsBox();
        return repaymentAmount;
    } else {
        const repaymentAmount = mortgageTypeInterestOnlyAmount();
        console.log(`Interest-only Repayment Amount: ${repaymentAmount}`);
        removeCalcImg();
        yourResultsTextUpdate();
        displayResultsBox();
        return repaymentAmount;
    }
}

// Clear Inputs Function
function clearAllFunction() {
    mortgageAmountInput.value = '';
    mortgageTermInput.value = '';
    interestRateInput.value = '';
    repaymentInput.checked = false;
    interestOnlyInput.checked = false;
    addCalcImg();
    // console.log('All inputs cleared!');
}

// Remove Calculator Image Function
function removeCalcImg() {
    if (calcImg) {
        calcImg.remove();
        // console.log('Calculator image removed!');
    }
}

// function addCalcImg() {
//     if (calcImg !== '') {
//         calcImg.add();
//         console.log('Calculator image added!');
//     }
// }

function yourResultsTextUpdate() {
    const yourResultsText = document.querySelector('.mortgage-results-inner-section-paragraph-text');
    const yourResultsTextHeadline = document.querySelector('.mortgage-results-inner-section-header-text');
    yourResultsText.textContent = 'Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.';
    yourResultsTextHeadline.textContent = 'Your results';
};




function displayResultsBox() {
    resultsBox.style.height = "100px";
    resultsBox.style.width = "100px";
    resultsBox.style.backgroundColor = "yellow";
    resultsBox.classList.add('.results-box-container');
}


