import { useState } from 'react';
import axios  from 'axios';
import Title from './Title';
import './App.css';


function App() {
  const [search, setSearch] = useState(""); // the state to store user input in the search bar, emtpy at the beginning
  const [query, setQuery] = useState(""); // the state to store the final query when press search button
  const [recipes, setRecipes] = useState([]); // the state to store the returned recipes as an array (since the returned data is in an array)
  
  const APP_ID = import.meta.env.VITE_APP_ID;
  const APP_KEY = import.meta.env.VITE_APP_KEY;
  const BASE_URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  
  const getRecipes = async () => {
    const response = await axios.get(BASE_URL);
    setRecipes(response.data.hits);
    console.log(data);
  }

  // update search state with the onChange event target value from button
  const updateSearch = (e) => {
    setSearch(e.target.value); // get the content from search bar and update the search state

    console.log(search);
  }

  // update query state when click on search button
  const getSearch = (e) => {
    e.preventDefault(); // prevent page refreshing when pressing submit button

    setQuery(search); // update the query state (for searching recipes)
    console.log(BASE_URL)
    getRecipes();
    setSearch(""); // clear the search bar
  }


  return (
    <>
      <div className="App">
        <Title />
        <form className="search-form" onSubmit={getSearch}>
          <input type="text" placeholder="What delicious recipe are you searching for today?" value={search} onChange={updateSearch}></input>
          <button type="submit">Search</button>
        </form>
      </div>
    </>
  )
}

export default App
