import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';
import { useState, useEffect } from 'react';

const App = () => {

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch('https://expense-tracker-6b16c-default-rtdb.firebaseio.com/expenses.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch expenses!');
                }

                const data = await response.json();
                const loadedExpenses = [];

                for (const key in data) {
                    loadedExpenses.push({
                        id: key,
                        title: data[key].title,
                        amount: data[key].amount,
                        date: new Date(data[key].date),
                    });
                }

                setExpenses(loadedExpenses);
            } catch (error) {
                console.error(error);
            }
        };

        fetchExpenses();
    }, []);

    const addExpenseHandler = async (expense) => {
        try {
            const response = await fetch('https://expense-tracker-6b16c-default-rtdb.firebaseio.com/expenses.json', {
                method: 'POST',
                body: JSON.stringify({
                    title: expense.title,
                    amount: expense.amount,
                    date: expense.date.toISOString(),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to save expense!');
            }

            const data = await response.json();

            const newExpense = {
                id: data.name,
                ...expense,
            };

            setExpenses((prevExpenses) => {
                return [newExpense, ...prevExpenses];
            });

        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <div>
            <NewExpense onAddExpense={addExpenseHandler} />
            <Expenses items={expenses} />
        </div>
    );
}

export default App;
