import Airesume from '@/app/(docs)/resume/component/resume/NetflixResumeForGoogle'
import ResumeGenerator from '@/app/(docs)/resume/component/resume/resume';
import React from 'react'

const resume: React.FC = () => {
  return (
    <div className='custom-background bg-black dark:bg-white'>
        {/* <Airesume/> */}
        <ResumeGenerator/>
    </div>
  );
};

export default resume;
