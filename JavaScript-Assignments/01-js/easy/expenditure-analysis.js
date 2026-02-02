/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function calculateTotalSpentByCategory(transactions) {
  const totals = {};

  // accumulate totals per category
  for (let i = 0; i < transactions.length; i++) {
    const { category, price } = transactions[i];

    if (totals[category]) {
      totals[category] += price;
    } else {
      totals[category] = price;
    }
  }

  // convert to required output format
  const result = [];

  for (let category in totals) {
    result.push({
      category: category,
      totalSpent: totals[category],
    });
  }

  return result;
}

module.exports = calculateTotalSpentByCategory;
