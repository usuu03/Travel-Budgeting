const express = require("express");
const ExpenseController = require("../controller/expenseController");

const router = express.Router();

router.get("/", ExpenseController.getAllExpenses);

router.get("/:id", ExpenseController.getExpenseById);

router.post("/", ExpenseController.addExpense);

router.put("/:id", ExpenseController.updateExpense);

router.delete("/:id", ExpenseController.deleteExpense);

module.exports = router;
