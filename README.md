# Expense Tracker

![Expense Tracker UI](<img width="1900" height="930" alt="image" src="https://github.com/user-attachments/assets/d6ed9da3-d39a-47d8-ab49-4e0c1fe157e5" />
)

A simple, modern Expense Tracker web app to record transactions, view balance, income, and expenses.

## Features
- Record income and expenses
- Auto-detect common expense keywords
- Monthly income support
- Persistent data using `localStorage`

## Quick Start
1. Clone or download the project.
2. Place a screenshot of the UI named `screenshot.png` in the project root (or update the image path below).
3. Open `index.html` in your browser (double-click or use a local server).

## Usage
- Use the **Save Monthly Income** form to set your monthly income.
- Add transactions with the **Add Transaction** form. Enter an item and amount.
- Transactions containing keywords like "rent", "food", "bill" are treated as expenses automatically.
- Click the ✖ button next to a transaction to remove it.

## Replace the UI Image
To show an actual screenshot at the top of this README:
1. Take a screenshot of the running app UI and save it as `screenshot.png` in the project root.
2. Commit the image to the repo. The README will display it automatically on GitHub.

If you prefer to keep images in an `assets/` folder, update the image reference at the top accordingly, e.g. `![Expense Tracker UI](assets/screenshot.png)`.

## Files
- `index.html` — main markup
- `style.css` — styles
- `script.js` — app logic and `localStorage` persistence

## License & Credits
Feel free to modify and use this project. Built with ❤️.
