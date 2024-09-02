"use client";

import React, { useState, useEffect } from "react";
import { Download, Search, Calendar, X } from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf"; // Include this library for PDF generation
import html2canvas from "html2canvas"; // Include this library to convert HTML to canvas
import ChatSupport from "@/registry/components/example/aichat/ai-bot-demo";
import LinkedIn from "@/components/icons/linkedin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";

interface ResumeData {
  name: string;
  phone: string;
  email: string;
  linkedin?: string;
  location?: string;
  linkedinref?: string;
  website?: string;
  summary?: string;
  skills: string[];
  experience: {
    company: string;
    position: string;
    duration: string;
    location: string;
    description: string;
  }[];
  projects: { name: string; description: string }[];
  education: {
    institution: string;
    degree: string;
    duration: string;
    gpa: string;
  }[];
  certificates: string[];
  leadership: string[];
}

interface YakkshitProps {
  resumeData: ResumeData;
}

const themes: {
  [key in
    | "default"
    | "google"
    | "facebook"
    | "amazon"
    | "netflix"
    | "microsoft"]: {
    primary: string;
    secondary: string;
    tertiary?: string;
    quaternary?: string;
    quinary?: string;
    headingtext?: string;
    text?: string;
    background?: string;
  };
} = {
  default: {
    primary: "bg-blue-500 dark:text-white text-black",
    secondary: "bg-blue-100 text-blue-900 dark:text-blue-100 dark:bg-blue-900",
    text: "text-gray-800 dark:text-white",
    background: "bg-white dark:bg-black",
    headingtext: "text-white",
  },
  google: {
    primary: "bg-red-500 dark:text-white text-black",
    secondary: "bg-red-100 text-red-900 dark:text-red-100 dark:bg-red-900",
    text: "text-gray-800 dark:text-white",
    background: "bg-white dark:bg-gray-800",
    tertiary: "bg-green-700",
    quaternary: "bg-yellow-600",
    quinary: "bg-gray-300 text-black",
  },
  facebook: {
    primary: "bg-blue-600 dark:text-white text-black",
    secondary: "bg-blue-100 text-blue-800 dark:text-blue-100 dark:bg-blue-900",
    text: "text-gray-800 dark:text-white",
    background: "bg-white dark:bg-gray-900",
  },
  amazon: {
    primary: "bg-orange-500 dark:text-white text-black",
    secondary:
      "bg-orange-100 text-orange-900 dark:text-orange-100 dark:bg-orange-900",
    text: "text-gray-800 dark:text-white",
    background: "bg-white dark:bg-gray-900",
  },
  microsoft: {
    primary: "bg-blue-700 dark:text-white text-black",
    secondary: "bg-blue-200 text-blue-800 dark:text-blue-100 dark:bg-blue-900",
    text: "text-gray-800 dark:text-white",
    background: "bg-white dark:bg-gray-800",
    quaternary: "bg-green-700",
    tertiary: "bg-yellow-600",
    quinary: "bg-gray-300 text-black",
  },
  netflix: {
    primary: "bg-red-600 text-white",
    secondary: "bg-red-200 text-red-800 dark:text-red-100 dark:bg-red-900",
    text: "text-gray-800 dark:text-white",
    background: "bg-black text-white dark:bg-gray-900",
  },
};

// const resumeData = {
//   name: "Venkata Sai Yakkshit Reddy Asodi",
//   location: "Berlin, Germany",
//   phone: "+91 9493006444",
//   email: "saiyakkshit2001@gmail.com",
//   linkedin: "yakkshit",
//   linkedinref: "https://linkedin.com/in/yakkshit",
//   website: "yakkshit.com",
//   summary:
//     "Passionate Software Developer specializing in crafting high-quality, scalable software solutions...",
//   skills: [
//     "Deployment/Automation/templating tools - Kubernetes, Docker, Bash Scripting, GraphQL, GithubActions, Terraform, Bitbucket/Gitlab",
//     "Frameworks - Django, Firebase, React, Flutter, Laravel",
//     "Languages - Python, JAVA, HTML, Go, JS, SQL, TypeScript, PHP",
//   ],
//   experience: [
//     {
//       company: "Spoki",
//       position: "Software Developer",
//       duration: "Apr 2024 – May 2024",
//       location: "Remote",
//       description:
//         "Worked as a consultant to develop a software integration between Spoki and Magento...",
//     },
//     {
//       company: "Circleup",
//       position: "Co-Founder/Lead Full Stack Engineer",
//       duration: "December 2023 – Present",
//       location: "Zurich, Switzerland",
//       description:
//         "Developed React and Flutter applications using Django for the backend...",
//     },
//     // Add more experiences here
//   ],
//   projects: [
//     {
//       name: "Covid 19 News",
//       description:
//         "Developed the iOS app 'COVID-19 New Alert' using Swift and Xcode...",
//     },
//     {
//       name: "CO2 monitoring system",
//       description:
//         "Developed an air quality monitor with particle matter monitoring and MQTT connectivity...",
//     },
//     // Add more projects here
//   ],
//   education: [
//     {
//       institution: "Blekinge Institute of Technology",
//       degree: "Computer Science",
//       duration: "Sep. 2022 – June. 2023",
//       location: "Valhallav¨agen 1, 371 41 Karlskrona",
//     },
//     {
//       institution: "University College Of Engineering Jntuk",
//       degree: "Bachelor of Science in Computer Science",
//       duration: "Aug. 2019 – Jun. 2022",
//       location: "Kakinada, AndhraPradesh, India 533003",
//     },
//   ],
//   certificates: [
//     "MTA(Microsoft Technical Associate)-Python",
//     "AI - Intern at Verzeo.inc",
//     "MTA(Microsoft Technical Associate)-Java",
//     // Add more certificates here
//   ],
//   leadership: [
//     "Led a chapter of 30+ members to work towards goals that improve and promote CedzLabs community service...",
//     "Contributed to Kubernetes by developing new functions in the release script...",
//     // Add more leadership experiences here
//   ],
// };

const YakkshitResume: React.FC<YakkshitProps> = ({ resumeData }) => {
  const [theme, setTheme] = useState("default");
  const [darkMode, setDarkMode] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
      if (e.key === "x" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((close) => !close);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const getCurrentThemeBackground = () => {
    // Example: Retrieve theme class from a global state or context
    // Adjust this based on how you manage themes in your application
    const theme = "default"; // Replace this with actual logic to get the current theme
    return themes[theme].background;
  };

  const downloadPDF = () => {
    const input = document.getElementById("resumeContent");
    if (input) {
      toast.info(
        "Try to download the file in light mode, full screen, and prefer to download it on a desktop device",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
  
      // Detect current theme
      const isDarkMode = document.documentElement.classList.contains('dark');
  
      // Temporarily add background color to ensure it is captured
      const originalBackgroundColor = window.getComputedStyle(input).backgroundColor;
      input.style.backgroundColor = isDarkMode ? '#000000' : '#ffffff';
  
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
  
        // Adjust the first page's image to start at the top
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        pdf.save(`${resumeData.name || 'resume'}-resume.pdf`);
  
        // Remove the temporary background color
        input.style.backgroundColor = originalBackgroundColor;
      });
    }
  };

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearchTerm("");
  };

  const filteredSkills = resumeData.skills.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredExperience = resumeData.experience.filter((exp) =>
    exp.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredProjects = resumeData.projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredEducation = resumeData.education.filter((edu) =>
    edu.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const themeStyles = themes[theme as keyof typeof themes];

  return (
    <div
      className={`min-h-screen gap-2 ${themeStyles.background} transition-colors duration-200`}
    >
      <header className="p-4 flex pb-2 justify-end items-end">
        <div className="flex items-center rounded-lg space-x-4">
          <select
            className="p-2 rounded bg-slate-100 dark:bg-slate-700"
            onChange={(e) => setTheme(e.target.value)}
            value={theme}
          >
            <option value="default">Default</option>
            <option value="google">Google</option>
            <option value="facebook">Facebook</option>
            <option value="amazon">Amazon</option>
            <option value="microsoft">Microsoft</option>
            <option value="netflix">Netflix</option>
          </select>
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <Search className="w-6 h-6" />
          </button>
          <button
            onClick={() => (window.location.href = "https://cal.com/yakkshit")}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <Calendar className="w-6 h-6" />
          </button>
          <Button
            onClick={downloadPDF}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <Download className="mr-2 h-6 w-6" /> Download pdf
          </Button>
        </div>
      </header>
      <main id="resumeContent" className="container rounded-lg mx-auto p-4">
        <section className="mb-8 text-center">
          <h1 id="resume" className="text-5xl font-bold mb-4">
            {resumeData.name}
          </h1>
          <div className="flex flex-wrap justify-center items-center space-x-4">
            <p>
              <a
                href={`tel:${resumeData.phone}`}
                className="hover:text-blue-500 hover:underline"
              >
                {resumeData.phone}
              </a>
            </p>
            <span>|</span>
            <p>
              <a
                href={`mailto:${resumeData.email}`}
                className="hover:text-blue-500 hover:underline"
              >
                {resumeData.email}
              </a>
            </p>
            <span>|</span>
            <p>
              <a
                href={resumeData.linkedinref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 hover:underline"
              >
                <LinkedIn className="w-4 h-4 inline-block" /> @yakkshit
              </a>
            </p>
            <span>|</span>
            <p>
              <a
                href={resumeData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 hover:underline"
              >
                Portfolio
              </a>
            </p>
          </div>
        </section>
        <section className="mb-8">
          <h2
            className={`text-xl font-semibold mb-2 ${themes[theme as keyof typeof themes].primary} p-2 rounded`}
          >
            Summary
          </h2>
          <p>{resumeData.summary}</p>
        </section>

        <section className="mb-8">
          <h2
            className={`text-xl font-semibold mb-2 ${themes[theme as keyof typeof themes].primary} p-2 rounded`}
          >
            Skills
          </h2>
          <ul className="list-disc pl-5">
            {resumeData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2
            className={`text-xl font-semibold mb-2 ${themes[theme as keyof typeof themes].primary} p-2 rounded`}
          >
            Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            <motion.div
              key={index}
              className={`mb-4 p-4 rounded ${themes[theme as keyof typeof themes].tertiary || themes[theme as keyof typeof themes].quaternary || themes[theme as keyof typeof themes].secondary || "bg-gray-100"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{exp.company}</h3>
                <p>{exp.position}</p>
              </div>
              <div className="flex justify-between">
                <p>{exp.duration}</p>
                <p>{exp.location}</p>
              </div>
              <p>{exp.description}</p>
            </motion.div>
          ))}
        </section>

        <section className="mb-8">
          <h2
            className={`text-xl font-semibold mb-2 ${themes[theme as keyof typeof themes].primary} p-2 rounded`}
          >
            Projects
          </h2>
          {resumeData.projects.map((project, index) => (
            <motion.div
              key={index}
              className={`mb-4 p-4 rounded ${themes[theme as keyof typeof themes].quaternary || themes[theme as keyof typeof themes].secondary || themes[theme as keyof typeof themes].tertiary || "bg-gray-100"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p>{project.description}</p>
            </motion.div>
          ))}
        </section>

        <section className="mb-8">
          <h2
            className={`text-xl font-semibold mb-2 ${themes[theme as keyof typeof themes].primary} p-2 rounded`}
          >
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            <motion.div
              key={index}
              className={`mb-4 p-4 rounded ${themes[theme as keyof typeof themes].quinary || themes[theme as keyof typeof themes].quaternary || themes[theme as keyof typeof themes].secondary || themes[theme as keyof typeof themes].tertiary || "bg-gray-100"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{edu.institution}</h3>
                <p>{edu.degree}</p>
              </div>
              <div className="flex justify-between">
                <p>{edu.duration}</p>
                <p>{edu.gpa}</p>
              </div>
            </motion.div>
          ))}
        </section>

        <section className="mb-8">
          <h2
            className={`text-xl font-semibold mb-2 ${themes[theme as keyof typeof themes].primary} p-2 rounded`}
          >
            Certificates
          </h2>
          <ul className="list-disc pl-5">
            {resumeData.certificates.map((certificate, index) => (
              <li key={index}>{certificate}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2
            className={`text-xl font-semibold mb-2 ${themes[theme as keyof typeof themes].primary} p-2 rounded`}
          >
            Voluntary work
          </h2>
          <ul className="list-disc pl-5">
            {resumeData.leadership.map((leadership, index) => (
              <li key={index}>{leadership}</li>
            ))}
          </ul>
        </section>
      </main>

      {searchOpen && (
      <motion.div
        className="fixed inset-0 bg-gray-800 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <button
            onClick={handleCloseSearch}
            className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder="Search skills, experience, projects, etc."
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              autoFocus
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="p-4 max-h-60 overflow-y-auto">
            <ul className="space-y-2">
              {filteredSkills.length === 0 &&
                filteredExperience.length === 0 &&
                filteredProjects.length === 0 &&
                filteredEducation.length === 0 && (
                  <li className="text-gray-500 dark:text-gray-400">
                    No results found.
                  </li>
                )}
              {filteredSkills.map((skill, index) => (
                <motion.li
                  key={index}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded dark:text-gray-200"
                  onClick={() => alert(`Skill: ${skill}`)}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.li>
              ))}
              {filteredExperience.map((exp, index) => (
                <motion.li
                  key={index}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded dark:text-gray-200"
                  onClick={() => alert(`Experience: ${exp.company}`)}
                  whileHover={{ scale: 1.05 }}
                >
                  {exp.company} - {exp.position}
                </motion.li>
              ))}
              {filteredProjects.map((project, index) => (
                <motion.li
                  key={index}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded dark:text-gray-200"
                  onClick={() => alert(`Project: ${project.name}`)}
                  whileHover={{ scale: 1.05 }}
                >
                  {project.name}
                </motion.li>
              ))}
              {filteredEducation.map((edu, index) => (
                <motion.li
                  key={index}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded dark:text-gray-200"
                  onClick={() => alert(`Education: ${edu.institution}`)}
                  whileHover={{ scale: 1.05 }}
                >
                  {edu.institution}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    )}
      <ToastContainer />
      <ChatSupport />
    </div>
  );
};

YakkshitResume.defaultProps = {
  resumeData: {
    name: "Venkata Sai Yakkshit Reddy Asodi",
    location: "Berlin, Germany",
    phone: "+91 9493006444",
    email: "saiyakkshit2001@gmail.com",
    linkedin: "yakkshit",
    linkedinref: "https://linkedin.com/in/yakkshit",
    website: "https://yakkshit.com",
    summary:
      "Passionate Software Developer specializing in crafting high-quality, scalable software solutions...",
    skills: [
      "Deployment/Automation/templating tools - Kubernetes, Docker, Bash Scripting, GraphQL, GithubActions, Terraform, Bitbucket/Gitlab",
      "Frameworks - Django, Firebase, React, Flutter, Laravel",
      "Languages - Python, JAVA, HTML, Go, JS, SQL, TypeScript, PHP",
    ],
    experience: [
      {
        company: "Spoki",
        position: "Software Developer",
        duration: "Apr 2024 – May 2024",
        location: "Remote",
        description:
          "Worked as a consultant to develop a software integration between Spoki and Magento...",
      },
      {
        company: "Circleup",
        position: "Co-Founder/Lead Full Stack Engineer",
        duration: "December 2023 – Present",
        location: "Zurich, Switzerland",
        description:
          "Developed React and Flutter applications using Django for the backend...",
      },
      // Add more experiences here
    ],
    projects: [
      {
        name: "Covid 19 News",
        description:
          "Developed the iOS app 'COVID-19 New Alert' using Swift and Xcode...",
      },
      {
        name: "CO2 monitoring system",
        description:
          "Developed an air quality monitor with particle matter monitoring and MQTT connectivity...",
      },
      // Add more projects here
    ],
    education: [
      {
        institution: "Blekinge Institute of Technology",
        degree: "Computer Science",
        duration: "Sep. 2022 – June. 2023",
        gpa: "3.3/4",
      },
      {
        institution: "University College Of Engineering Jntuk",
        degree: "Bachelor of Science in Computer Science",
        duration: "Aug. 2019 – Jun. 2022",
        gpa: "3/4",
      },
    ],
    certificates: [
      "MTA(Microsoft Technical Associate)-Python",
      "AI - Intern at Verzeo.inc",
      "MTA(Microsoft Technical Associate)-Java",
      // Add more certificates here
    ],
    leadership: [
      "Led a chapter of 30+ members to work towards goals that improve and promote CedzLabs community service...",
      "Contributed to Kubernetes by developing new functions in the release script...",
      // Add more leadership experiences here
    ],
  },
};

export default YakkshitResume;