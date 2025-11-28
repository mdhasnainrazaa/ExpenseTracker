const form = document.getElementById('form');
const incomeForm = document.getElementById('form-income');

const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const monthlyIncomeInput = document.getElementById('monthlyIncome');

const transactionsList = document.getElementById('transactions');
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');

// Load data
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let monthlyIncome = JSON.parse(localStorage.getItem('monthlyIncome')) || 0;

// Save monthly income
incomeForm.addEventListener("submit", e => {
  e.preventDefault();
  monthlyIncome = Number(monthlyIncomeInput.value);

  localStorage.setItem("monthlyIncome", JSON.stringify(monthlyIncome));
  updateSummary();

  alert("Monthly Income Updated!");
  incomeForm.reset();
});

// Add transaction
form.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();

  const text = textInput.value.trim();
  let amount = Number(amountInput.value);

  if (!text || isNaN(amount) || amount === 0) {
    alert("Enter valid item and amount!");
    return;
  }

  // Auto detect expense (if user forgets minus sign)
  const keywords = ["expense", "food", "rent", "bill", "pay", "emi", "grocery"];
  const isExpenseKeyword = keywords.some(k => text.toLowerCase().includes(k));

  if (isExpenseKeyword) {
    amount = -Math.abs(amount);
  }

  const transaction = {
    id: Date.now(),
    text,
    amount
  };

  transactions.push(transaction);
  updateLocalStorage();
  renderTransactions();
  form.reset();
}

// Delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  renderTransactions();
}

// Render transactions
function renderTransactions() {
  transactionsList.innerHTML = '';

  transactions.forEach(t => {
    const li = document.createElement('li');
    li.classList.add(t.amount > 0 ? 'income' : 'expense');

    li.innerHTML = `
      ${t.text}
      <span>${t.amount > 0 ? '+' : '-'}₹${Math.abs(t.amount)}</span>
      <button onclick="deleteTransaction(${t.id})"><i class="fa-solid fa-xmark"></i></button>
    `;

    transactionsList.appendChild(li);
  });

  updateSummary();
}

// Summary
function updateSummary() {
  const amounts = transactions.map(t => t.amount);

  const income = amounts.filter(a => a > 0).reduce((a, b) => a + b, 0);
  const expense = amounts.filter(a => a < 0).reduce((a, b) => a + Math.abs(b), 0);

  const balance = (monthlyIncome + income) - expense;

  balanceEl.textContent = `₹${balance.toFixed(2)}`;
  incomeEl.textContent = `₹${(monthlyIncome + income).toFixed(2)}`;
  expenseEl.textContent = `₹${expense.toFixed(2)}`;
}

// Save to localStorage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initial load
renderTransactions();
updateSummary();
