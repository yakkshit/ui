'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// In a real application, these should be stored securely and not exposed in the client-side code
const APP_ID = 'f1772605'
const APP_KEY = 'c4c0612fcfead9a8ce3e1a323fd059dd'

const searchRecipes = async (query: string) => {
  const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
  const data = await response.json()
  return data.hits.map((hit: any) => hit.recipe)
}

type Recipe = {
  label: string
  image: string
  calories: number
  totalNutrients: {
    SUGAR: { quantity: number }
    PROCNT: { quantity: number }
    FAT: { quantity: number }
    CHOCDF: { quantity: number }
  }
  healthLabels: string[]
  ingredientLines: string[]
  url: string
}

const HealthMeter = ({ labels }: { labels: string[] }) => {
  const healthScore = labels.includes('Balanced') ? 90 : labels.includes('Low-Fat') ? 80 : 70
  return (
    <div className="w-full">
      <Progress value={healthScore} className="w-full" />
      <p className="text-sm text-muted-foreground mt-1">Health Score: {healthScore}%</p>
    </div>
  )
}

const NutritionInfo = ({ recipe }: { recipe: Recipe }) => (
  <div className="grid grid-cols-2 gap-2 text-sm">
    <p>Calories: {Math.round(recipe.calories)}</p>
    <p>Sugar: {Math.round(recipe.totalNutrients.SUGAR.quantity)}g</p>
    <p>Protein: {Math.round(recipe.totalNutrients.PROCNT.quantity)}g</p>
    <p>Fat: {Math.round(recipe.totalNutrients.FAT.quantity)}g</p>
    <p>Carbs: {Math.round(recipe.totalNutrients.CHOCDF.quantity)}g</p>
  </div>
)

const CookingProcess = ({ recipe }: { recipe: Recipe }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">View Cooking Process</Button>
    </DialogTrigger>
    <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{recipe.label}</DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
        <ul className="list-disc pl-5 mb-4">
          {recipe.ingredientLines.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
        <p>For detailed instructions, please visit: <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Original Recipe</a></p>
      </div>
    </DialogContent>
  </Dialog>
)

export default function RecipeSearchDemo() {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    try {
      const results = await searchRecipes(query)
      setRecipes(results)
    } catch (error) {
      console.error('Error searching recipes:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe Search</h1>
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search for recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{recipe.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <Image
                  src={recipe.image}
                  alt={recipe.label}
                  width={200}
                  height={200}
                  className="rounded-md"
                />
                <HealthMeter labels={recipe.healthLabels} />
                <NutritionInfo recipe={recipe} />
                <CookingProcess recipe={recipe} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}