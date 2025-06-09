import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

const NewExpense = ({ onAddExpense, postExpense, loading, error, onExpenseSaved }) => {

    const saveExpenseDataHandler = (expense) => {
        const applyData = (data) => {
            const expenseData = {
                ...expense,
                id: data.name,
            };
            onAddExpense(expenseData);
            onExpenseSaved();
        };

        postExpense(
            {
                url: 'https://expense-tracker-6b16c-default-rtdb.firebaseio.com/expenses.json',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    title: expense.title,
                    amount: expense.amount,
                    date: expense.date.toISOString(),
                },
            },
            applyData
        );
    }

    return <div className="new-expense">
        <ExpenseForm loading={loading} error={error} onSaveExpenseData={saveExpenseDataHandler} />
    </div>
}

export default NewExpense;