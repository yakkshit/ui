"use client"


import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define interfaces for the API response
interface Recipe {
    label: string;
    image: string;
    source: string;
}

interface RecipeHit {
    recipe: Recipe;
}

interface ApiResponse {
    hits: RecipeHit[];
}

// Define a type for the component's state
type ApiState = {
    data: ApiResponse | null;
    loading: boolean;
    error: Error | null;
};

const Demo: React.FC = () => {
    // Initialize state with proper types
    const [state, setState] = useState<ApiState>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        // Define an async function to fetch data
        const fetchData = async () => {
            try {
                // Fetch data from the API
                const response = await axios.get<ApiResponse>(
                    'https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=chicken&app_id=f1772605&app_key=c4c0612fcfead9a8ce3e1a323fd059dd',
                    {
                        headers: {
                            accept: 'application/json',
                            'Accept-Language': 'de',
                        },
                    }
                );
                
                // Update state with the fetched data
                setState({
                    data: response.data,
                    loading: false,
                    error: null,
                });
            } catch (error) {
                // Set error state
                setState({
                    data: null,
                    loading: false,
                    error: error instanceof Error ? error : new Error('Unknown error'),
                });
            }
        };

        // Call the fetch function
        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    if (state.loading) {
        return <div>Loading...</div>; // Display a loading message
    }

    if (state.error) {
        return <div>Error: {state.error.message}</div>; // Display an error message
    }

    return (
        <div className='tutorial'>
            <h1 className='mb-4 text-2xl'>Data D</h1>
            {state.data && state.data.hits.length > 0 && (
                <ul>
                    {state.data.hits.map((hit, index) => (
                        <li key={index}>
                            <h2>{hit.recipe.label}</h2>
                            <img src={hit.recipe.image} alt={hit.recipe.label} />
                            <p>{hit.recipe.source}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Demo;
