import styles from './styles/recipe.module.css';

// recipe information template
const Recipe = ({title, calories, image, ingredients}) => {
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