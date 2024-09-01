"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePDF } from "react-to-pdf";
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Moon,
  Send,
  Sun,
  Upload,
  X,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AnimatePresence, motion } from "framer-motion";
import Yakkshit from "../yakkshit-resume";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "next-themes";

interface ResumeData {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  location: string;
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

export default function ResumeGenerator() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    education: "",
    skills: "",
    linkedin: "",
    github: "",
    achievements: "",
  });
  const [jobDescription, setJobDescription] = useState("");
  // const [generatedResumeai, setGeneratedResumeai] = useState("");
  // const [uploadStatus, setUploadStatus] = useState({
  //   success: false,
  //   message: "uploading ...",
  // });
  const { toPDF, targetRef } = usePDF({ filename: "resume.pdf" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvData, setCvData] = useState<ResumeData | null>(null);
  const [cvJson, setCvJson] = useState("");
  const [generatedResume, setGeneratedResume] = useState<ResumeData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(false);

  // const generateResumeai = () => {
  //   const resume = `
  //     ${userData.name}
  //     ${userData.email} | ${userData.phone}
  //     LinkedIn: ${userData.linkedin}
  //     GitHub: ${userData.github}

  //     Experience:
  //     ${userData.experience}

  //     Education:
  //     ${userData.education}

  //     Skills:
  //     ${userData.skills}

  //     Achievements:
  //     ${userData.achievements}

  //     Tailored for Job Description:
  //     ${jobDescription}
  //   `;
  //   setGeneratedResumeai(resume);
  // };

  // const uploadToLinkedIn = async () => {
  //   console.log("Uploading to LinkedIn...");
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     setUploadStatus({
  //       success: true,
  //       message: "Successfully uploaded to LinkedIn!",
  //     });
  //   } catch (error) {
  //     setUploadStatus({
  //       success: false,
  //       message: "Failed to upload to LinkedIn. Please try again.",
  //     });
  //   }
  // };

  // const uploadToGitHub = async () => {
  //   console.log("Uploading to GitHub...");
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     setUploadStatus({
  //       success: true,
  //       message: "Successfully uploaded to GitHub!",
  //     });
  //   } catch (error) {
  //     setUploadStatus({
  //       success: false,
  //       message: "Failed to upload to GitHub. Please try again.",
  //     });
  //   }
  // };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (fileExtension === "json") {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          try {
            const result = e.target?.result;
            if (typeof result === "string") {
              const json = JSON.parse(result) as ResumeData;
              setCvData(json);
              setCvJson(JSON.stringify(json, null, 2));
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
            alert("Invalid JSON file. Please upload a valid JSON.");
          }
        };
        reader.readAsText(file);
      } else if (fileExtension === "pdf") {
        setCvFile(file);
      } else {
        alert("Unsupported file type. Please upload a .json or .pdf file.");
      }
    }
  };

  const generateResume = () => {
    if (!cvData && !cvJson) {
      alert(
        "Please provide CV data either by uploading a file or entering JSON."
      );
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedResume(cvData || JSON.parse(cvJson));
      setIsLoading(false);
      setShowOutput(true);
      setIsOutputCollapsed(false);
    }, 3000);
  };

  const toggleOutput = () => {
    setIsOutputCollapsed(!isOutputCollapsed);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Resume Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                name="linkedin"
                value={userData.linkedin}
                onChange={handleInputChange}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                name="github"
                value={userData.github}
                onChange={handleInputChange}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Label htmlFor="experience">Experience</Label>
              <Textarea
                id="experience"
                name="experience"
                value={userData.experience}
                onChange={handleInputChange}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Label htmlFor="education">Education</Label>
              <Textarea
                id="education"
                name="education"
                value={userData.education}
                onChange={handleInputChange}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Label htmlFor="skills">Skills</Label>
              <Textarea
                id="skills"
                name="skills"
                value={userData.skills}
                onChange={handleInputChange}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Label htmlFor="achievements">Achievements</Label>
              <Textarea
                id="achievements"
                name="achievements"
                value={userData.achievements}
                onChange={handleInputChange}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label htmlFor="cv-upload" className="block mb-2 font-medium">
                Upload CV (JSON/PDF)
              </label>
              <div className="flex items-center space-x-2">
                <Button asChild variant="outline">
                  <label htmlFor="cv-upload" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </label>
                </Button>
                <span className="text-sm text-gray-500">
                  {cvData ? "File uploaded Successfully" : "No file chosen"}
                </span>
              </div>
              <input
                id="cv-upload"
                type="file"
                accept=".json, .pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label htmlFor="cv-json" className="block mb-5 font-medium">
                CV JSON Data
              </label>
              <Textarea
                id="cv-json"
                placeholder="Enter your CV JSON data here..."
                value={cvJson}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setCvJson(e.target.value)
                }
                rows={5}
                className="font-mono text-sm"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label
                htmlFor="job-description"
                className="block mb-2 font-medium"
              >
                Job Description
              </label>
              <Textarea
                id="job-description"
                placeholder="Enter the job description here..."
                value={jobDescription}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setJobDescription(e.target.value)
                }
                rows={5}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                onClick={generateResume}
                className="w-full"
                disabled={isLoading}
              >
                <Send className="w-4 h-4 mr-2" />
                {isLoading ? "Generating..." : "Generate Resume"}
              </Button>
            </motion.div>

            {/* <div>
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea 
                id="jobDescription" 
                value={jobDescription} 
                onChange={(e) => setJobDescription(e.target.value)} 
              />
            </div> */}
            {/* <div>
              <Label htmlFor="cvUpload">Upload CV (PDF)</Label>
              <Input id="cvUpload" type="file" accept=".pdf|.json" onChange={handleFileUpload} />
            </div> */}
          </div>
        </CardContent>
        <CardFooter>
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              >
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mb-4 mx-auto"></div>
                  <p className="text-xl font-semibold">Generating Resume...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showOutput && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 bg-white z-40 overflow-auto"
              >
                <div className="p-8 bg-black dark:bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl text-white dark:text-black font-bold">
                      Generated Resume
                    </h2>
                    <div className="flex items-center">
                      <Button variant="outline" className="mr-2">
                        <ModeToggle />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowOutput(false)}
                        className="mr-2"
                      >
                        <X />
                      </Button>
                    </div>
                  </div>
                  {!isOutputCollapsed && generatedResume && (
                    <Card>
                      <CardContent className="p-6">
                        <Yakkshit resumeData={generatedResume} />
                      </CardContent>
                    </Card>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </Card>

      {/* {generatedResumeai && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Generated Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={targetRef}>
              <pre className="whitespace-pre-wrap">{generatedResumeai}</pre>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            <Button onClick={() => toPDF()}>Download PDF</Button>
            <Button onClick={uploadToLinkedIn}>Upload to LinkedIn</Button>
            <Button onClick={uploadToGitHub}>Upload to GitHub</Button>
          </CardFooter>
        </Card>
      )} */}

      {/* {uploadStatus.message && (
        <Alert variant={uploadStatus.success ? "default" : "destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{uploadStatus.success ? "Success" : "Error"}</AlertTitle>
          <AlertDescription>{uploadStatus.message}</AlertDescription>
        </Alert>
      )} */}
    </div>
  );
}
