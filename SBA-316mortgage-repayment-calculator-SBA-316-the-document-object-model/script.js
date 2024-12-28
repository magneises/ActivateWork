// Variable Declarations
const mortgageAmountInput = document.querySelector('#mortgage-amount');
const mortgageTermInput = document.querySelector('#mortgage-term');
const interestRateInput = document.querySelector('#interest-rate');
const repaymentInput = document.querySelector('#repayment');
const interestOnlyInput = document.querySelector('#interest-only');
const clearAllClick = document.querySelector('#clear-all');
const calculatePaymentsClick = document.querySelector('#btn-calculate-payments');
const calcImg = document.querySelector('.calc-image');
const resultsBox = document.querySelector('.results-box-container');



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
        console.log(`Repayment Amount: $${repaymentAmount}`);
        removeCalcImg();
        yourResultsTextUpdate();

        // Pass the content to displayResultsBox
        displayResultsBox(`YOUR MONTHLY REPAYMENT IS: $${repaymentAmount}`);
        return repaymentAmount;
    } else {
        const repaymentAmount = mortgageTypeInterestOnlyAmount();
        console.log(`Interest-only Repayment Amount: $${repaymentAmount}`);
        removeCalcImg();
        yourResultsTextUpdate();

        // Pass the content to displayResultsBox
        displayResultsBox(`YOUR INTEREST-ONLY MONTHLY REPAYMENT IS: $${repaymentAmount}`);
        return repaymentAmount;
    }
}



function clearAllFunction() {
    // Clear input values
    mortgageAmountInput.value = '';
    mortgageTermInput.value = '';
    interestRateInput.value = '';
    repaymentInput.checked = false;
    interestOnlyInput.checked = false;

    // Restore the default image in its original position
    addCalcImg();

    // Reset the text content
    const yourResultsText = document.querySelector('.mortgage-results-inner-section-paragraph-text');
    const yourResultsTextHeadline = document.querySelector('.mortgage-results-inner-section-header-text');
    if (yourResultsText && yourResultsTextHeadline) {
        yourResultsText.textContent = 'Complete the form and click "calculate repayments" to see what your monthly repayments would be..';
        yourResultsTextHeadline.textContent = 'Calculate your mortgage';
    }

    // Remove the results box if it exists
    const resultsBox = document.querySelector('.results-box-container');
    if (resultsBox) {
        resultsBox.remove();
    }

    console.log('All inputs cleared, and results section reset!');
}


// Remove Calculator Image Function
function removeCalcImg() {
    if (calcImg) {
        calcImg.remove();
        console.log('Calculator image removed!');
    }
}

function addCalcImg() {
    const resultsSection = document.querySelector('.mortgage-results-section');
    if (calcImg && resultsSection) {
        // Ensure the container for the image exists
        const calcImgContainer = document.createElement('div');
        calcImgContainer.className = 'calc-img-container'; // Add a class for styling if needed

        // Append the image to the container
        calcImgContainer.appendChild(calcImg);

        // Prepend the container above the text
        resultsSection.insertBefore(calcImgContainer, resultsSection.firstChild);

        // Ensure the image is displayed as a block element above the text
        calcImg.style.display = 'block';  // Ensure block display to push the text below
        calcImg.style.margin = '0 auto';  // Center it horizontally
        calcImg.style.width = '';        // Reset any width adjustments
        calcImg.style.height = '';       // Reset any height adjustments

        console.log('Calculator image added in the original position!');
    }
}



function yourResultsTextUpdate() {
    const yourResultsText = document.querySelector('.mortgage-results-inner-section-paragraph-text');
    const yourResultsTextHeadline = document.querySelector('.mortgage-results-inner-section-header-text');
    if (yourResultsText && yourResultsTextHeadline) {
        yourResultsText.textContent = 'Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.';
        yourResultsTextHeadline.textContent = 'Your results';
    } else {
        console.error('Results text or headline elements not found.');
    }
}

function displayResultsBox(content) {
    // Check if the results box already exists
    let resultsBox = document.querySelector('.results-box-container');
    
    if (!resultsBox) {
        // Create the element only if it doesn't already exist
        resultsBox = document.createElement('div');
        resultsBox.className = 'results-box-container';
        
        // Append it to the mortgage-results-section
        const resultsSection = document.querySelector('.mortgage-results-section'); // Adjust as needed
        if (resultsSection) {
            resultsSection.appendChild(resultsBox);
        } else {
            console.error('Mortgage results section not found. Appending to body.');
            document.body.appendChild(resultsBox);
        }
    }

    // Apply styles
    resultsBox.style.height = "15em";
    resultsBox.style.width = "25rem";
    resultsBox.style.backgroundColor = "#0e2431";
    resultsBox.style.color = "white";
    resultsBox.style.display = "flex";
    resultsBox.style.justifyContent = "center";
    resultsBox.style.alignItems = "center";
    resultsBox.style.textAlign = "center";
    resultsBox.style.borderRadius = "8px";
    resultsBox.style.padding = "1rem";
    resultsBox.style.borderTop = ".2rem solid #a5b44f";

    // Center the box horizontally
    resultsBox.style.margin = "0 auto";

    // Update the content of the box
    resultsBox.textContent = content;
    resultsBox.classList.add('visible');
}





