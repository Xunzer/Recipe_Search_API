import styles from './styles/recipe.module.css'; // as the css module is only for this component, we could we whatever name we want

// recipe information template
const Recipe = ({title, calories, image, ingredients}) => {
    // passing data from App component's states to Recipe component through props and destructuring with "{}"
    return (
        <div className={styles.recipe}>
            <h1>{title}</h1>
            <ul> 
                {/* since ingredients is an array of objects, so we need to iterate through it with map to display them and assign an unique id to each */}
                {ingredients.map(ingredient => (
                    <li key={crypto.randomUUID()}>{ingredient.text}</li>
                ))}
            </ul>
            <p>Calories: {Math.floor(calories)}g</p>
            <img className={styles.image} src={image} alt="Failed to load image"/>
        </div>
    )
}

export default Recipe;