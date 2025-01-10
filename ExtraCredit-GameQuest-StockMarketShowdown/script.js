/* variable declarations */
const priceOfStock = document.querySelectorAll('.price-of-stock');
const submitOrderBtn = document.querySelector('.submit-order-btn');
const startGameBtn = document.querySelector('.start-game-btn');
const growthOrLossCells = document.querySelectorAll('.growth-or-Loss'); // Correct selector for growth/loss cells

// Initialize an array to store previous prices for each stock
let previousPrices = Array(priceOfStock.length).fill(0);

/* event listeners */
submitOrderBtn.addEventListener('click', () => {
    alert('Order Placed!');
});

startGameBtn.addEventListener('click', startGame);

// functions
function startGame() {
    priceOfStock.forEach((cell, index) => {
        // Generate a random price
        const price = randomPrice();
        const currentPrice = parseFloat(price.replace('$', '')); // Convert to number
        cell.textContent = price; // Update the price in the table

        // Compare with the previous price
        const previousPrice = previousPrices[index];
        const growthOrLossText = calculateGrowthOrLoss(currentPrice, previousPrice);

        // Update the growth/loss cell
        growthOrLossCells[index].textContent = growthOrLossText;

        // Update the previous price for the next round
        previousPrices[index] = currentPrice;
    });

    console.log('Game Started!');
}

function randomPrice() {
    const price = Math.floor(Math.random() * 100);
    return `$${price.toFixed(2)}`;
}

function calculateGrowthOrLoss(currentPrice, previousPrice) {
    const priceDifference = currentPrice - previousPrice;
    const growthChange = ((priceDifference / previousPrice) * 100).toFixed(2);

    if (currentPrice > previousPrice) {
        return `${growthChange}%`;
    } else if (currentPrice < previousPrice) {
        return `${growthChange}%`;
    } else {
        return "No Change";
    }
}

