import { useState, useEffect } from 'react';
import axios  from 'axios';
import Title from './Title';
import Footer from './Footer';
import Recipe from './Recipe';
import './styles/App.css';


function App() {

  // states
  const [search, setSearch] = useState(""); // the state to store user input in the search bar, emtpy at the beginning
  const [query, setQuery] = useState("mango"); // the state to store the final query when press search button
  const [recipes, setRecipes] = useState([]); // the state to store the returned recipes as an array (since the returned data is in an array)

  // effect - every time query array is changed, the getRecipes() will run (including initialization)
  useEffect(() => {
    getRecipes();
    }, [query]);
  
  // constants for the API
  const APP_ID = import.meta.env.VITE_APP_ID;
  const APP_KEY = import.meta.env.VITE_APP_KEY;
  const BASE_URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`; // back ticks for interpolation with what is inside ${}


  // update the recipes state after triggering the useEffect hook. Making an asynchronous call, use "await" keyword to await call to complete, although lets caller of function continue processing (asynchronous)
  const getRecipes = async () => {
    const response = await axios.get(BASE_URL); // send the request by given search key word an get the response using axios
    setRecipes(response.data.hits); // you can only call set state function once for each state

    console.log(recipes);
  }

  // update search state with the onChange event target value from button
  const updateSearch = (e) => {
    setSearch(e.target.value); // get the content from search bar and update the search state

    console.log(search);
  }

  // update query state when click on search button
  const getSearch = (e) => {
    e.preventDefault(); // prevent page refreshing when pressing submit button

    setQuery(search); // update the query state (for searching recipes) and trigger the useEffect hook
    console.log(BASE_URL)
    setSearch(""); // clear the search bar
  }

  // change the text in search button on mouse over and out
  const buttonOver = (e) => {
    e.target.innerHTML = "Let's Go!";
    e.target.style.backgroundColor = '#03dd0e';
  }

  const buttonOut = (e) => {
    e.target.innerHTML = "Search";
    e.target.style.backgroundColor = '#ff4800';
  }


  return (
      <div className="App">
        <Title />
        <form className="search-form" onSubmit={getSearch}>
          <input type="text" placeholder="What delicious recipe are you searching for today?" value={search} onChange={updateSearch}></input>
          <button type="submit" onMouseOver={buttonOver} onMouseOut={buttonOut}>Search!</button>
        </form>
        <div className="recipes">
          {recipes.length > 0 && recipes.map(recipe => (
              <Recipe
                // pass the state data as prop to render actual item values for this component
                key={crypto.randomUUID()} // generated as key attribute to prevent compile warning on browser (should be an unique one)
                title={recipe.recipe.label} 
                calories={recipe.recipe.calories} 
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients} // ingredient is an array 
              />
            ))
          }
        </div>
        <footer><Footer /></footer>

      </div>
  )
}

export default App;
