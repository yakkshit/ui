export const resumeData = {
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
};


export type resumeData = typeof resumeData;