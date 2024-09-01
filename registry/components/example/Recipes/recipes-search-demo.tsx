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
import { motion } from 'framer-motion'

const searchRecipes = async (query: string) => {
  const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${query}&app_id=${process.env.NEXT_PUBLIC_APP_ID}&app_key=${process.env.NEXT_PUBLIC_RECIPES_SEARCH_APP_KEY}`)
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

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const handleSearch = async () => {
    setLoading(true)
    try {
      const results = await searchRecipes(query)
      const shuffledResults = shuffleArray(results)
      setRecipes(shuffledResults)
    } catch (error) {
      console.error('Error searching recipes:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
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
          onKeyDown={handleKeyPress}
          className="flex-grow"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {recipes.map((recipe, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}



// with out shadcn ui

// 'use client'

// import { useState } from 'react'
// import Image from 'next/image'
// import { motion } from 'framer-motion'

// const searchRecipes = async (query: string) => {
//   const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${query}&app_id=${process.env.NEXT_PUBLIC_APP_ID}&app_key=${process.env.NEXT_PUBLIC_RECIPES_SEARCH_APP_KEY}`)
//   const data = await response.json()
//   return data.hits.map((hit: any) => hit.recipe)
// }

// type Recipe = {
//   label: string
//   image: string
//   calories: number
//   totalNutrients: {
//     SUGAR: { quantity: number }
//     PROCNT: { quantity: number }
//     FAT: { quantity: number }
//     CHOCDF: { quantity: number }
//   }
//   healthLabels: string[]
//   ingredientLines: string[]
//   url: string
// }

// const HealthMeter = ({ labels }: { labels: string[] }) => {
//   const healthScore = labels.includes('Balanced') ? 90 : labels.includes('Low-Fat') ? 80 : 70
//   return (
//     <div className="w-full">
//       <progress value={healthScore} max="100" className="w-full"></progress>
//       <p className="text-sm text-muted-foreground mt-1">Health Score: {healthScore}%</p>
//     </div>
//   )
// }

// const NutritionInfo = ({ recipe }: { recipe: Recipe }) => (
//   <div className="grid grid-cols-2 gap-2 text-sm">
//     <p>Calories: {Math.round(recipe.calories)}</p>
//     <p>Sugar: {Math.round(recipe.totalNutrients.SUGAR.quantity)}g</p>
//     <p>Protein: {Math.round(recipe.totalNutrients.PROCNT.quantity)}g</p>
//     <p>Fat: {Math.round(recipe.totalNutrients.FAT.quantity)}g</p>
//     <p>Carbs: {Math.round(recipe.totalNutrients.CHOCDF.quantity)}g</p>
//   </div>
// )

// const CookingProcess = ({ recipe }: { recipe: Recipe }) => (
//   <details>
//     <summary className="cursor-pointer">View Cooking Process</summary>
//     <div className="mt-4">
//       <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
//       <ul className="list-disc pl-5 mb-4">
//         {recipe.ingredientLines.map((ingredient, index) => (
//           <li key={index}>{ingredient}</li>
//         ))}
//       </ul>
//       <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
//       <p>For detailed instructions, please visit: <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Original Recipe</a></p>
//     </div>
//   </details>
// )

// export default function RecipeSearchDemo() {
//   const [query, setQuery] = useState('')
//   const [recipes, setRecipes] = useState<Recipe[]>([])
//   const [loading, setLoading] = useState(false)

//   const handleSearch = async () => {
//     setLoading(true)
//     try {
//       const results = await searchRecipes(query)
//       setRecipes(results)
//     } catch (error) {
//       console.error('Error searching recipes:', error)
//       // Handle error (e.g., show error message to user)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       handleSearch()
//     }
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Recipe Search</h1>
//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Search for recipes..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyDown={handleKeyPress}
//           className="flex-grow p-2 border rounded"
//         />
//         <button onClick={handleSearch} disabled={loading} className="p-2 border rounded bg-blue-500 text-white">
//           {loading ? 'Searching...' : 'Search'}
//         </button>
//       </div>
//       {loading && <div className="flex justify-center items-center"><div className="loader"></div></div>}
//       <motion.div
//         className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {recipes.map((recipe, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <div className="border rounded p-4">
//               <h2 className="text-xl font-bold">{recipe.label}</h2>
//               <Image
//                 src={recipe.image}
//                 alt={recipe.label}
//                 width={200}
//                 height={200}
//                 className="rounded-md"
//               />
//               <HealthMeter labels={recipe.healthLabels} />
//               <NutritionInfo recipe={recipe} />
//               <CookingProcess recipe={recipe} />
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//       <style jsx>{`
//         .loader {
//           border: 4px solid rgba(0, 0, 0, 0.1);
//           width: 36px;
//           height: 36px;
//           border-radius: 50%;
//           border-left-color: #09f;
//           animation: spin 1s ease infinite;
//         }
//         @keyframes spin {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }
//         .dark .loader {
//           border-left-color: #fff;
//         }
//       `}</style>
//     </div>
//   )
// }
