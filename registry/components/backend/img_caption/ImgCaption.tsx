import React, { useEffect, useState } from 'react';
import { fetchImageCaptions } from './api';
import { cn } from '@/lib/utils';

const ImageCaptions: React.FC = () => {
  const [captions, setCaptions] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCaptions = async () => {
      try {
        const data = await fetchImageCaptions();
        setCaptions(data);
      } catch (err: any) { // Explicitly typing the error as 'any'
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getCaptions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={cn('p-4', 'bg-white', 'rounded-lg', 'shadow-md')}>
      <h1 className={cn('text-xl', 'font-bold', 'mb-4')}>Image Captions</h1>
      <pre>{JSON.stringify(captions, null, 2)}</pre>
    </div>
  );
};

export default ImageCaptions;
