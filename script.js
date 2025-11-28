const form = document.getElementById('form');
const incomeForm = document.getElementById('form-income');

const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const monthlyIncomeInput = document.getElementById('monthlyIncome');

const transactionsList = document.getElementById('transactions');
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');

// Load Data
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let monthlyIncome = JSON.parse(localStorage.getItem('monthlyIncome')) || 0;

// Save Monthly Income
incomeForm.addEventListener("submit", e => {
  e.preventDefault();
  monthlyIncome = Number(monthlyIncomeInput.value);

  localStorage.setItem("monthlyIncome", JSON.stringify(monthlyIncome));
  updateSummary();

  alert("Monthly Income Updated!");
  incomeForm.reset();
});

// Add Transaction
form.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();

  const text = textInput.value.trim();
  const amount = Number(amountInput.value);

  if (!text || isNaN(amount) || amount === 0) {
    alert("Enter valid item and amount!");
    return;
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

// Delete
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  renderTransactions();
}

// Render List
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

// Summary Calculations
function updateSummary() {
  const amounts = transactions.map(t => t.amount);

  const income = amounts.filter(a => a > 0).reduce((acc, val) => acc + val, 0);
  const expense = amounts.filter(a => a < 0).reduce((acc, val) => acc + Math.abs(val), 0);

  const balance = (monthlyIncome + income) - expense;

  balanceEl.textContent = `₹${balance.toFixed(2)}`;
  incomeEl.textContent = `₹${(monthlyIncome + income).toFixed(2)}`;
  expenseEl.textContent = `₹${expense.toFixed(2)}`;
}

// Save to storage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initial Display
renderTransactions();
updateSummary();
