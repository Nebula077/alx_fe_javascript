const quote = document.getElementById('quoteDisplay');
//quote.textContent = "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt";

let quotes = [
    "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
    "In the middle of every difficulty lies opportunity. - Albert Einstein",
    "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
    "The best way to predict the future is to create it. - Peter Drucker"
];

let quoteCategories = {
    inspiration: [
        "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
        "In the middle of every difficulty lies opportunity. - Albert Einstein",
        "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
        "The best way to predict the future is to create it. - Peter Drucker"
    ],
    motivation: [
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "It does not matter how slowly you go as long as you do not stop. - Confucius",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill"
    ]
};

let allQuotes = [
    "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
    "In the middle of every difficulty lies opportunity. - Albert Einstein",
    "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
    "The best way to predict the future is to create it. - Peter Drucker",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill"
    ]

let currentCategory = 'all';

function showRandomQuote(category) {
    let quotesToUse;
    if (category === 'all') {
        quotesToUse = allQuotes;
    } else {
        quotesToUse = quoteCategories[category] || [];
    }
    return quotesToUse[Math.floor(Math.random() * quotesToUse.length)];
}

const displayQuotebtn = document.getElementById('newQuote');
displayQuotebtn.addEventListener('click', () => {
    quote.innerHTML = showRandomQuote(currentCategory);
});

const categoryFilter = document.getElementById('categoryFilter');
categoryFilter.addEventListener('change', (e) => {
    currentCategory = e.target.value;
    quote.textContent = showRandomQuote(currentCategory);
});

let addedQuotes = localStorage.getItem('addedQuotes');
if (addedQuotes) {
    addedQuotes = JSON.parse(addedQuotes);    
}
if (addedQuotes && Array.isArray(addedQuotes)) {
    quotes = quotes.concat(addedQuotes);
    allQuotes = allQuotes.concat(addedQuotes);
}
// Initial quote display
quote.textContent = showRandomQuote(currentCategory);

function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    const quoteForm = createAddQuoteForm();
    if (newQuoteText && newQuoteCategory) {
        quotes.push(newQuoteText);
        quoteCategories[newQuoteCategory] = quoteCategories[newQuoteCategory] || [];
        quoteCategories[newQuoteCategory].push(newQuoteText);
        allQuotes.push(newQuoteText);
        localStorage.setItem('addedQuotes', JSON.stringify(quotes));
        quote.textContent = showRandomQuote(currentCategory);
    }
}

const addQuoteBtn = document.getElementById('addQuoteBtn');
addQuoteBtn.addEventListener('click', addQuote);