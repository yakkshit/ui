// api.ts
import axios from 'axios';

const BASE_URL = process.env.RECIPE_APP_URL;
const APP_ID = process.env.RECIPE_APP_ID; // Replace with your actual app_id
const APP_KEY = process.env.RECIPE_APP_KEY; // Replace with your actual app_key

export const getRecipeNutrition = async (recipe: { title: string; ingr: string[] }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`,
      recipe,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe nutrition:', error);
    throw error;
  }
};
