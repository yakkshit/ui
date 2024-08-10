// api.ts (Server Component)
import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://image-caption-generator2.p.rapidapi.com/v2/captions',
  params: {
    imageUrl: 'https://i.pinimg.com/564x/26/c7/35/26c7355fe46f62d84579857c6f8c4ea5.jpg',
    useEmojis: 'true',
    useHashtags: 'true',
    limit: '3',
    vibe: 'happy',
    lang: 'English'
  },
  headers: {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': 'image-caption-generator2.p.rapidapi.com'
  }
};

export async function fetchImageCaptions() {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch image captions');
  }
}
