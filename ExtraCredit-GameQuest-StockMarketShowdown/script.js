/* variable declarations */
const priceOfStock = document.querySelectorAll('.price-of-stock');
const submitOrderBtn = document.querySelector('.submit-order-btn');
const startGameBtn = document.querySelector('.start-game-btn');
const growthOrLossCells = document.querySelectorAll('.growth-or-Loss');
const playerPortfolioValue = document.querySelector('.player1-portfolio-value');
const computerPortfolioValue =document.querySelector('.computer-portfolio-value')
// Buy Buttons
const buyBtns = document.querySelectorAll('.buy-btn');
// Sell Buttons
const sellBtns = document.querySelectorAll('.sell-btn');
// Initialize an array to store previous prices for each stock
let previousPrices = Array(priceOfStock.length).fill(0);




/* event listeners */
submitOrderBtn.addEventListener('click', () => {
    alert('Order Placed!');
});

submitOrderBtn.addEventListener('click', submitOrder);

startGameBtn.addEventListener('click', startGame);




buyBtns.forEach(buyBtn => {
    buyBtn.addEventListener('click', () => {
        // Dynamically create a new input field for buy
        const buyBtnInput = document.createElement('input');
        buyBtnInput.className = 'buyBtnInputClass';
        buyBtnInput.type = 'number';
        buyBtnInput.placeholder = 'Enter buy amount';

        // Replace the button with the newly created input
        const parent = buyBtn.parentNode;
        parent.replaceChild(buyBtnInput, buyBtn);

        // Focus on the input field after replacement
        buyBtnInput.focus();

        // Add an event listener to reset back to the button on 'blur'
        buyBtnInput.addEventListener('blur', () => {
            parent.replaceChild(buyBtn, buyBtnInput);
        });

        // Add an event listener to reset back to the button on 'Enter' key
        buyBtnInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                parent.replaceChild(buyBtn, buyBtnInput);
            }
        });
    });
});


sellBtns.forEach(sellBtn => {
    sellBtn.addEventListener('click', () => {
        // Dynamically create a new input field for sell
        const sellBtnInput = document.createElement('input');
        sellBtnInput.className = 'sellBtnInputClass';

        // Replace the button with the newly created input
        const parent = sellBtn.parentNode;
        parent.replaceChild(sellBtnInput, sellBtn);

        // Focus on the input field after replacement
        sellBtnInput.focus();

        // Add an event listener to reset back to the button on 'blur'
        sellBtnInput.addEventListener('blur', () => {
            parent.replaceChild(sellBtn, sellBtnInput);
        });

        // Add an event listener to reset back to the button on 'Enter' key
        sellBtnInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                parent.replaceChild(sellBtn, sellBtnInput);
            }
        });
    });
});








// Functions
function startGame() {
    priceOfStock.forEach((cell, index) => {
        // Generate a random price
        const price = randomPrice();
        const currentPrice = parseFloat(price.replace('$', '')); // Convert to number
        let playerPortfolioValue = 1000;
        console.log(`this is player portfolio value: ${playerPortfolioValue}`)
        cell.textContent = price; // Update the price in the table

        // Compare with the previous price
        const previousPrice = previousPrices[index];
        const growthOrLossText = calculateGrowthOrLoss(currentPrice, previousPrice);

        // Update the growth/loss cell
        const growthOrLossCell = growthOrLossCells[index];
        growthOrLossCell.textContent = growthOrLossText;

        // Update the color based on growth or loss
        if (currentPrice > previousPrice) {
            growthOrLossCell.style.color = "green";
        } else if (currentPrice < previousPrice) {
            growthOrLossCell.style.color = "red";
        } else {
            growthOrLossCell.style.color = "black"; // No change
        }

        // Update the previous price for the next round
        previousPrices[index] = currentPrice;
    });
    console.log('Game Started!');
}

function submitOrder() {
    priceOfStock.forEach((cell, index) => {
        // Generate a random price
        const price = randomPrice();
        const currentPrice = parseFloat(price.replace('$', '')); // Convert to number
        cell.textContent = price; // Update the price in the table

        // Compare with the previous price
        const previousPrice = previousPrices[index];
        const growthOrLossText = calculateGrowthOrLoss(currentPrice, previousPrice);

        // Update the growth/loss cell
        const growthOrLossCell = growthOrLossCells[index];
        growthOrLossCell.textContent = growthOrLossText;

        // Update the color based on growth or loss
        if (currentPrice > previousPrice) {
            growthOrLossCell.style.color = "green";
        } else if (currentPrice < previousPrice) {
            growthOrLossCell.style.color = "red";
        } else {
            growthOrLossCell.style.color = "black"; // No change
        }

        // Update the previous price for the next round
        previousPrices[index] = currentPrice;
    });
}


function randomPrice() {
    const price = Math.random() * 100;
    return `$${price.toFixed(2)}`;
}


function calculateGrowthOrLoss(currentPrice, previousPrice) {
    if (previousPrice === 0) {
        return "N/A"; // Handle the initial case where no previous price exists
    }

    const priceDifference = currentPrice - previousPrice;
    const growthChange = ((priceDifference / previousPrice) * 100).toFixed(2);

    if (currentPrice > previousPrice) {
        return `+${growthChange}%`;
    } else if (currentPrice < previousPrice) {
        return `${growthChange}%`;
    } else {
        return "No Change";
    }
}




