// recipes.tsx
import React, { useState } from 'react';
import { getRecipeNutrition } from './api';

interface NutritionData {
  calories: number;
  yield: number;
  // Add other properties as needed
}

const RecipeComponent: React.FC = () => {
  const [recipe, setRecipe] = useState({ title: '', ingr: [''] });
  const [nutrition, setNutrition] = useState<NutritionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newIngredients = [...recipe.ingr];
    newIngredients[index] = e.target.value;
    setRecipe({ ...recipe, ingr: newIngredients });
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingr: [...recipe.ingr, ''] });
  };

  const handleFetchNutrition = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRecipeNutrition(recipe);
      setNutrition(data);
    } catch (err) {
      setError('Failed to fetch nutrition data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">Recipe Nutrition Analysis</h1>
      <input
        type="text"
        placeholder="Recipe Title"
        value={recipe.title}
        onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {recipe.ingr.map((ingredient, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Ingredient ${index + 1}`}
          value={ingredient}
          onChange={(e) => handleInputChange(e, index)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      ))}
      <button
        onClick={handleAddIngredient}
        className="w-full p-2 bg-blue-500 text-white rounded mt-2"
      >
        Add Ingredient
      </button>
      <button
        onClick={handleFetchNutrition}
        className="w-full p-2 bg-green-500 text-white rounded mt-2"
      >
        Fetch Nutrition
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {nutrition && (
        <div className="mt-4 text-black">
          <h2 className="text-xl font-bold text-black">Nutrition Information</h2>
          <p className='text-black'>Calories: {nutrition.calories}</p>
          <p>Yield: {nutrition.yield}</p>
          {/* Add more nutrition details as needed */}
        </div>
      )}
    </div>
  );
};

export default RecipeComponent;
