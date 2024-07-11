import { GetDrinksResponse, GetIngredientsResponse } from './models/apiModels';
import axios from 'axios';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export const getRandomDrink = () => axios.get(`${API_URL}/random.php`);
export const searchDrinkByName = (name: string) => axios.get(`${API_URL}/search.php?s=${name}`);
export const getIngredients = (name: string) => axios.get(`${API_URL}/search.php?s=${name}`);
export const getDrinks = async (name: string) => {
    const response = await axios.get<GetDrinksResponse>(`${API_URL}/search.php?s=${name}`)
    return response;
};
