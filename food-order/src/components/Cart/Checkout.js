import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        address: true,
        postalCode: true,
        city: true
    })

    const nameInputRef = useRef();
    const addressInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const nameIsValid = !isEmpty(enteredName);
        const addressIsValid = !isEmpty(enteredAddress);
        const postalCodeIsValid = isFiveChars(enteredPostalCode);
        const cityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: nameIsValid,
            address: addressIsValid,
            postalCode: postalCodeIsValid,
            city: cityIsValid
        })

        const formIsValid = nameIsValid && addressIsValid && postalCodeIsValid && cityIsValid;

        if (!formIsValid) {
            return;
        }

        const userData = {
            name: enteredName,
            address: enteredAddress,
            postalCode: enteredPostalCode,
            city: enteredCity
        };

        props.onConfirm(userData);
    }

    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
    const addressControlClasses = `${classes.control} ${formInputsValidity.address ? '' : classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={addressControlClasses}>
                <label htmlFor='address'>Street Address</label>
                <input type='text' id='address' ref={addressInputRef} />
                {!formInputsValidity.address && <p>Please enter a valid address!</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal-code'>Postal Code</label>
                <input type='text' id='postal-code' ref={postalCodeInputRef} />
                {!formInputsValidity.postalCode && <p>Please enter a valid postal code!</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button type='submit' className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;