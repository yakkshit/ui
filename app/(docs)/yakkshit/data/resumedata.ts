export type resumeData = {
  name: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  linkedinref: string;
  website: string;
  summary: string;
  skills: string[];
  experience: {
    company: string;
    position: string;
    duration: string;
    location: string;
    description: string;
  }[];
  projects: {
    name: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    duration: string;
    location: string;
  }[];
  certificates: string[];
  leadership: string[];
};

const resumeData: resumeData = require('./resumeData.json');
