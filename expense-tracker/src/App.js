import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';
import { useState, useCallback, useEffect } from 'react';
import useHttp from './hooks/use-http';

const App = () => {

    const [expenses, setExpenses] = useState([]);
    const {
        sendRequest: postExpense,
        isLoading: isPosting,
        error: postError
    } = useHttp();

    const {
        sendRequest: fetchExpenses,
        isLoading: isFetching,
        error: fetchError
    } = useHttp();

    const updateExpenses = useCallback(() => {
        const transformExpenses = (data) => {
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
        };

        fetchExpenses(
            { url: 'https://expense-tracker-6b16c-default-rtdb.firebaseio.com/expenses.json' },
            transformExpenses
        );
    }, [fetchExpenses]);

    useEffect(() => {
        updateExpenses();
    }, [updateExpenses]);

    const addExpenseHandler = (expense) => {
        setExpenses((prevExpenses) => [expense, ...prevExpenses]);
    };

    return (
        <div>
            <NewExpense
                onAddExpense={addExpenseHandler}
                postExpense={postExpense}
                loading={isPosting}
                error={postError}
                onExpenseSaved={updateExpenses}
            />
            <Expenses
                items={expenses}
                loading={isFetching}
                error={fetchError}
                fetchExpenses={updateExpenses}
            />
        </div>
    );
};

export default App;
