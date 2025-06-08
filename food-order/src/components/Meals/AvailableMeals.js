import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch('https://food-order-app-2f6ef-default-rtdb.firebaseio.com/meals.json');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const mealsData = await response.json();
            const loadedMeals = [];

            for (const key in mealsData) {
                loadedMeals.push({
                    id: key,
                    name: mealsData[key].name,
                    description: mealsData[key].description,
                    price: mealsData[key].price
                });
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        };
        fetchMeals().catch(error => {
            setIsLoading(false);
            setError(error.message);
        });
    }, []);

    if (isLoading) {
        return (
            <section className={classes.meals}>
                <Card>
                    <h2 className={classes["info-text"]}>Loading...</h2>
                </Card>
            </section>
        );
    }

    if (error) {
        return (
            <section className={classes.meals}>
                <Card>
                    <h2 className={classes["info-text"]}>{error}</h2>
                </Card>
            </section>
        );
    }

    const mealsList = meals.map(meal =>
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    );

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                    {!meals.length && <h2 className={classes["info-text"]}>No meals found. Maybe add one?</h2>}
                </ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;