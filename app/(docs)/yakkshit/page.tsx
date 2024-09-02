"use client"


import YakkshitResume from "@/app/(docs)/yakkshit/components/yakkshit-resume";
import { useEffect, useState } from 'react';

const Yakkshit: React.FC = () => {
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    fetch('/data/resumeData.json')
      .then(response => response.json())
      .then(data => setResumeData(data));
  }, []);

  if (!resumeData) return <div>Loading...</div>;

  return (
    <>
      <YakkshitResume resumeData={resumeData} />
    </>
  );
};

export default Yakkshit;
