var popupContainer = document.getElementById("popupContainer");
var popupTitle = document.getElementById("popupTitle");
var transactionForm = document.getElementById("transactionForm");
var transactionTableBody = document.getElementById("transactionTableBody");
var remainingBalance = document.getElementById("remainingBalance");

document.getElementById("addIncomeButton").addEventListener("click", function() {
  openPopup("income");
});

document.getElementById("addExpenseButton").addEventListener("click", function() {
  openPopup("expense");
});

transactionForm.addEventListener("submit", function(event) {
  event.preventDefault();
  submitTransaction();
});

function openPopup(type) {
  popupContainer.style.display = "block";

  if (type === "income") {
    popupTitle.textContent = "Add Income";
  } else if (type === "expense") {
    popupTitle.textContent = "Add Expense";
  }
}

function submitTransaction() {
  var transactionDate = document.getElementById("transactionDate").value;
  var transactionDesc = document.getElementById("transactionDesc").value;
  var transactionAmount = parseFloat(document.getElementById("transactionAmount").value);
  var transactionType = popupTitle.textContent.includes("Income") ? "Income" : "Expense";

  // Create a new row in the table
  var newRow = transactionTableBody.insertRow();

  // Create new cells for date, description, amount, and type
  var dateCell = newRow.insertCell();
  var descCell = newRow.insertCell();
  var amountCell = newRow.insertCell();
  var typeCell = newRow.insertCell();

  // Set the cell values to the user input
  dateCell.textContent = transactionDate;
  descCell.textContent = transactionDesc;
  amountCell.textContent = transactionAmount.toFixed(2);
  typeCell.textContent = transactionType;

  // Clear the form fields
  document.getElementById("transactionDate").value = "";
  document.getElementById("transactionDesc").value = "";
  document.getElementById("transactionAmount").value = "";

  // Calculate the remaining balance
  calculateRemainingBalance();

  // Close the popup
  popupContainer.style.display = "none";
}

function calculateRemainingBalance() {
  var incomeTotal = 0;
  var expenseTotal = 0;

  // Iterate through the rows in the table
  for (var i = 0; i < transactionTableBody.rows.length; i++) {
    var row = transactionTableBody.rows[i];
    var amount = parseFloat(row.cells[2].textContent);

    if (row.cells[3].textContent === "Income") {
      incomeTotal += amount;
    } else if (row.cells[3].textContent === "Expense") {
      expenseTotal += amount;
    }
  }

  var remainingBalanceValue = incomeTotal - expenseTotal;
  remainingBalance.textContent = "Total Balance: " + remainingBalanceValue.toFixed(2);
}
