import { useState } from 'react';
import classes from './UserInput.module.css';

const UserInput = (props) => {

    const initialUserInput = {
        'current-savings': '100000',
        'yearly-contribution': '10000',
        'expected-return': '5',
        'duration': '10',
    }

    const [userInput, setUserInput] = useState(initialUserInput);

    const submitHandler = (event) => {
        event.preventDefault();
        props.onCalculate(userInput);
    }

    const resetHandler = (event) => {
        setUserInput({
            'current-savings': '',
            'yearly-contribution': '',
            'expected-return': '',
            'duration': '',
        });
        props.onReset();
    }

    const inputChangeHandler = (input, value) => {
        setUserInput((prevState) => {
            return {
                ...prevState,
                [input]: +value,
            };
        });
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes['input-group']}>
                <p>
                    <label htmlFor="current-savings">Current Savings ($)</label>
                    <input
                        onChange={(event) => inputChangeHandler('current-savings', event.target.value)}
                        value={userInput['current-savings']}
                        type="number" id="current-savings" />
                </p>
                <p>
                    <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                    <input
                        onChange={(event) => inputChangeHandler('yearly-contribution', event.target.value)}
                        value={userInput['yearly-contribution']}
                        type="number" id="yearly-contribution" />
                </p>
            </div>
            <div className={classes['input-group']}>
                <p>
                    <label htmlFor="expected-return">
                        Expected Interest (%, per year)
                    </label>
                    <input
                        onChange={(event) => inputChangeHandler('expected-return', event.target.value)}
                        value={userInput['expected-return']}
                        type="number" id="expected-return" />
                </p>
                <p>
                    <label htmlFor="duration">Investment Duration (years)</label>
                    <input
                        onChange={(event) => inputChangeHandler('duration', event.target.value)}
                        value={userInput['duration']}
                        type="number" id="duration" />
                </p>
            </div>
            <p className={classes.actions}>
                <button type="reset" className={classes.buttonAlt} onClick={resetHandler}>
                    Reset
                </button>
                <button type="submit" className={classes.button}>
                    Calculate
                </button>
            </p>
        </form>
    );
}

export default UserInput;