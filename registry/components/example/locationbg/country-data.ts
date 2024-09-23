// pages/api/country-data.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type Point = [number, number]

const countryData: { [key: string]: Point[] } = {
  in: [
    // Array of [x, y] coordinates representing India's shape
    [0, 0], [0.1, 0.1], [0.2, 0.2], // ... more points
  ],
  // Add data for other countries
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Point[]>
) {
  const { code } = req.query
  const data = countryData[code as string] || []
  res.status(200).json(data)
}