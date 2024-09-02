import Airesume from '@/app/(docs)/resume/component/resume/NetflixResumeForGoogle'
import ResumeGenerator from '@/app/(docs)/resume/component/resume/resume';
import React from 'react'
import AiResume from './component/ai-resume';

const resume: React.FC = () => {
  return (
    <div className='dark:bg-black bg-white'>
        {/* <Airesume/> */}
        {/* <ResumeGenerator/> */}
        <AiResume/>
    </div>
  );
};

export default resume;
