import { useReducer } from 'react';

const initialState = {
    value: '',
    isTouched: false
}

const inputStateReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.value, isTouched: state.isTouched };
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isTouched: true };
    }
    if (action.type === 'RESET') {
        return { value: '', isTouched: false };
    }
    return initialState;
};

const useInput = (validateValue) => {

    const [inputState, dispatch] = useReducer(inputStateReducer, initialState);

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;
    
    const valueChangeHandler = (event) => {
        dispatch({ type: 'USER_INPUT', value: event.target.value });
    }

    const inputBlurHandler = (event) => {
        dispatch({ type: 'INPUT_BLUR' });
    }

    const reset = () => {
        dispatch({ type: 'RESET' });
    }

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }
}

export default useInput;