import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

function Expenses({ items, loading, error }) {
    const currentYear = new Date().getFullYear().toString();
    const [filteredYear, setFilteredYear] = useState(currentYear);

    const filterChangeHandler = (selectedYear) => {
        setFilteredYear(selectedYear);
    };

    const filteredExpenses = items.filter((expense) => {
        return expense.date.getFullYear().toString() === filteredYear;
    });

    return (
        <>
            <Card className="expenses">
                <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
                <ExpensesChart expenses={filteredExpenses} />
                {loading && <p style={{ color: 'white', textAlign: 'center' }}>Loading expenses...</p>}
                {error && <p style={{ color: 'white', textAlign: 'center' }}>{error}</p>}
                {!loading && !error && <ExpensesList items={filteredExpenses} />}
            </Card>
        </>
    );
}

export default Expenses;
