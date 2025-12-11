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

let getAll = document.createElement('li');
getAll.textContent = 'All Quotes';

function showRandomQuote(category) {
    let quotesToUse;
    if (category === 'all') {
        quotesToUse = allQuotes;
    } else {
        quotesToUse = quoteCategories[category] || [];
    }
    return quotesToUse[Math.floor(Math.random() * quotesToUse.length)];
}

function showQuotesList(category) {
    const quoteList = document.getElementById('quoteList');
    quoteList.innerHTML = '';
    let quotesToUse;
    if (category === 'all') {
        quotesToUse = allQuotes;
        allQuotes.forEach((quote) => {
            const quoteItem = document.createElement('li');
            quoteItem.textContent = quote;
            quoteList.appendChild(quoteItem);
        });
    } else {
        quotesToUse = quoteCategories[category] || [];
    }
    quotesToUse.forEach((quote) => {
        const quoteItem = document.createElement('li');
        quoteItem.textContent = quote;
        quoteList.appendChild(quoteItem);
    });
}

const displayQuotebtn = document.getElementById('newQuote');
displayQuotebtn.addEventListener('click', () => {
    allQuotes = allQuotes.concat(quotes);
    quote.textContent = showRandomQuote(currentCategory);
});

const categoryFilter = document.getElementById('categoryFilter');
categoryFilter.addEventListener('change', (e) => {
    currentCategory = e.target.value;
    quote.textContent = showRandomQuote(currentCategory);
});

function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Quotes</option>';
    for (const category in quoteCategories) {
        const option = document.createElement('option');
        option.map = category;
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    }
}

function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    selectedCategory.save();
    showQuotesList(selectedCategory);
}
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

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }

  function saveQuotes() {
    localStorage.setItem('addedQuotes', JSON.stringify(quotes));
  }


const importBtn = document.getElementById('importBtn');
importBtn.addEventListener('click', () => {
    importFromJsonFile();
});

function createDowlnloadLink(data, filename) {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}