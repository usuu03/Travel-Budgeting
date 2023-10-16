const Expense = require("../models/Expense");
const Destination = require("../models/Destination");
const User = require("../models/User");

const getAllExpenses = async (req, res) => {
  const expenses = await Expense.findAll();

  res.status(200).json(expenses);
};

const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = Expense.findByPk(id);

    if (!user) {
      res
        .status(404)
        .json({ message: "Expense with id: " + id + " does not exist" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("No such expense", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addExpense = async (req, res) => {
  try {
    const {
      name,
      date,
      category,
      amount,
      currency,
      notes,
      destinationId,
      userId,
    } = req.body;

    const user = await User.findByPk(userId);
    const destination = await Destination.findByPk(destinationId);

    if (!user && !destination) {
      res.status(404).json({ message: "User or destination does not exist" });
    }

    const newExpense = await Expense.create({
      name,
      date,
      category,
      amount,
      currency,
      notes,
      destinationId: destination.id,
      userId: user.id,
    });

    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error adding new expense", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = req.body;

    const expenseUpdate = await Expense.findByPk(id);

    if (!expenseUpdate) {
      return res.status(404).json({ message: "No such expense" });
    }

    await expenseUpdate.update(updatedExpense);
    res.status(200).json({
      message: "Expense updated successfully",
      expense: updateExpense,
    });
  } catch (error) {
    console.error("Error updating expense", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expenseToDelete = await Expense.findByPk(id);

    if (!expenseToDelete) {
      res.status(404).json({ message: "No such expense" });
    }
    await expenseToDelete.destroy();

    res.status(200).json({
      message: "Expense deleted successfully",
      expense: expenseToDelete,
    });
  } catch (error) {
    console.error("Error deleting expense", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense,
};
