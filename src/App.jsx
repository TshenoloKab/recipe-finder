import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import Loader from './components/Loader';
import plate from './assets/plate.png';


const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecipes = async (query) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await res.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError('No recipes found.');
      }
    } catch (err) {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <img src={plate} alt="plate-icon Screenshot" className="plate-image" />
      <h1>
        Recipe Finder
      </h1>
      <SearchBar onSearch={fetchRecipes} />
      {loading && <Loader />}
      {error && <p className="error">{error}</p>}
      <div className="recipes">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default App;
