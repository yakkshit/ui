"use client";

import { useEffect, useState } from 'react';
import YakkshitResume from '@/app/(docs)/yakkshit/components/yakkshit-resume';

const Yakkshit: React.FC = () => {
  const [resumeData, setResumeData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await fetch('/data/resumeData.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setResumeData(data);
      } catch (error: any) {
        console.error('Failed to fetch resume data:', error.message);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return <YakkshitResume resumeData={resumeData} />;
};

export default Yakkshit;
