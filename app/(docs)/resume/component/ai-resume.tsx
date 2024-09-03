"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Toast } from "@/app/(docs)/resume/component/toast";
import { useToast } from "@/app/(docs)/resume/component/use-toast";
import {
  PlusIcon,
  MinusIcon,
  DownloadIcon,
  UploadIcon,
  MaximizeIcon,
  MinimizeIcon,
  SunIcon,
  MoonIcon,
  SearchIcon,
  Send,
} from "lucide-react";
import { useTheme } from "next-themes";
import Yakkshit from "./yakkshit-resume";
import { ToastProvider } from "@radix-ui/react-toast";
import VideoEmbed from "@/components/video-embedd";
import ReactPlayer from "react-player";

interface FormData {
  name: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  website: string;
  summary: string;
  skills: string[];
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    location: string;
    description: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    duration: string;
    gpa: string;
  }>;
  certificates: string[];
  leadership: string[];
}

const tips = [
  "Click on Cmd+F to search",
  "Use cmd+f to toggle full screen",
  "Download your resume as JSON for later use",
  "Upload a JSON file to quickly fill out the form",
  "Don't forget to add your most recent projects",
  "Customize your resume for each job application",
];

export default function AiResume() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    location: "",
    phone: "",
    email: "",
    linkedin: "",
    website: "",
    summary: "",
    skills: [""],
    experience: [
      {
        company: "",
        position: "",
        duration: "",
        location: "",
        description: "",
      },
    ],
    projects: [{ name: "", description: "" }],
    education: [{ institution: "", degree: "", duration: "", gpa: "" }],
    certificates: [""],
    leadership: [""],
  });
  const [jobDescription, setJobDescription] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isResumeViewFullScreen, setIsResumeViewFullScreen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const otherFileInputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [cvJson, setCvJson] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "f" && !e.ctrlKey && !e.metaKey) {
        setIsResumeViewFullScreen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      toast({
        title: "Tip",
        description: randomTip,
      });
    }, 60000); // Show a tip every minute

    return () => clearInterval(interval);
  }, [toast]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: keyof FormData,
    subfield?: string
  ) => {
    const { name, value } = e.target;
    if (subfield) {
      const newData = [...(formData[field] as any[])];
      newData[index] = { ...newData[index], [subfield]: value };
      setFormData({ ...formData, [field]: newData });
    } else if (Array.isArray(formData[field])) {
      const newData = [...(formData[field] as any[])];
      newData[index] = value;
      setFormData({ ...formData, [field]: newData });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addField = (field: keyof FormData) => {
    const newData = [...(formData[field] as any[])];
    if (typeof newData[0] === "object") {
      newData.push(
        Object.fromEntries(Object.keys(newData[0]).map((key) => [key, ""]))
      );
    } else {
      newData.push("");
    }
    setFormData({ ...formData, [field]: newData });
  };

  const removeField = (field: keyof FormData, index: number) => {
    const newData = [...(formData[field] as any[])];
    newData.splice(index, 1);
    setFormData({ ...formData, [field]: newData });
  };

  const handleDownload = () => {
    const jsonString = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume_data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const uploadedData = JSON.parse(e.target?.result as string);
          setFormData(uploadedData);
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          toast({
            title: "Error",
            description:
              "Error parsing JSON file. Please make sure it's a valid JSON format.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleOtherFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle other file types here
      toast({
        title: "File Uploaded",
        description: `File "${file.name}" uploaded. Implement parsing logic for this file type.`,
      });
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const toggleResumeViewFullScreen = () => {
    setIsResumeViewFullScreen(!isResumeViewFullScreen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const generateResume = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowOutput(true);
      setIsOutputCollapsed(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <motion.div
          className="w-full lg:w-1/2 space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Resume Information</h2>
          <div className="flex gap-2">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button onClick={() => fileInputRef.current?.click()}>
                <UploadIcon className="mr-2 h-4 w-4" /> Upload JSON
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".json"
                className="hidden"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button onClick={() => otherFileInputRef.current?.click()}>
                <UploadIcon className="mr-2 h-4 w-4" /> Upload Other File Types
              </Button>
              <input
                type="file"
                ref={otherFileInputRef}
                onChange={handleOtherFileUpload}
                className="hidden"
              />
            </motion.div>
          </div>
          <Input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleChange(e, 0, "name")}
          />
          <Input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => handleChange(e, 0, "location")}
          />
          <Input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => handleChange(e, 0, "phone")}
          />
          <Input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange(e, 0, "email")}
          />
          <Input
            name="linkedin"
            placeholder="LinkedIn"
            value={formData.linkedin}
            onChange={(e) => handleChange(e, 0, "linkedin")}
          />
          <Input
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={(e) => handleChange(e, 0, "website")}
          />
          <Textarea
            name="summary"
            placeholder="Summary"
            value={formData.summary}
            onChange={(e) => handleChange(e, 0, "summary")}
          />

          {(["skills", "certificates", "leadership"] as const).map((field) => (
            <div key={field} className="space-y-2">
              <h3 className="text-lg font-semibold capitalize">{field}</h3>
              {formData[field].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Input
                    value={item}
                    onChange={(e) => handleChange(e, index, field)}
                    placeholder={`Enter ${field} item`}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeField(field, index)}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
              <Button onClick={() => addField(field)}>
                Add {field.slice(0, -1)}
              </Button>
            </div>
          ))}

          {(["experience", "projects", "education"] as const).map((field) => (
            <div key={field} className="space-y-2">
              <h3 className="text-lg font-semibold capitalize">{field}</h3>
              {formData[field].map((item, index) => (
                <motion.div
                  key={index}
                  className="space-y-2 border p-2 rounded"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {Object.keys(item).map((subfield) => (
                    <Input
                      key={subfield}
                      value={(item as any)[subfield]}
                      onChange={(e) => handleChange(e, index, field, subfield)}
                      placeholder={
                        subfield.charAt(0).toUpperCase() + subfield.slice(1)
                      }
                    />
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => removeField(field, index)}
                  >
                    Remove {field.slice(0, -1)}
                  </Button>
                </motion.div>
              ))}
              <Button onClick={() => addField(field)}>
                Add {field.slice(0, -1)}
              </Button>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 space-y-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl mt-2 font-bold">JSON Preview</h2>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button className="mt-2" onClick={handleDownload}>
                    <DownloadIcon className="mr-2 h-4 w-4" /> Download JSON
                  </Button>
                </motion.div>
              </div>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto max-h-[calc(100vh-200px)]">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Resume View</h2>
                <div className="flex mt-2 gap-2">
                  <Button
                    onClick={toggleTheme}
                    size="icon"
                    variant="outline"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <SunIcon className="h-4 w-4" />
                    ) : (
                      <MoonIcon className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    onClick={toggleResumeViewFullScreen}
                    size="icon"
                    variant="outline"
                    aria-label="Toggle full screen"
                  >
                    {isResumeViewFullScreen ? (
                      <MinimizeIcon className="h-4 w-4" />
                    ) : (
                      <MaximizeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div
                className={`overflow-auto ${isResumeViewFullScreen ? "fixed inset-0 z-50 bg-white dark:bg-gray-900 p-8" : "max-h-[calc(100vh-200px)]"}`}
              >
                <Yakkshit resumeData={formData} />
                {isResumeViewFullScreen && (
                  <Button
                    className="fixed bottom-4 left-4"
                    onClick={toggleResumeViewFullScreen}
                    aria-label="Exit full screen"
                  >
                    Exit Full Screen
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* tips
          <Card className="hidden lg:block">
            <CardContent>
            <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Tip of the Moment</h2>
            <p className="text-base">{tips}</p>
                </div>
                </CardContent>
          </Card> */}

          <Card>
            <CardContent>
              <div className="rounded-lg shadow-grey-glow dark:shadow-white-glow overflow-hidden">
                <VideoEmbed
                  src="https://youtu.be/I7-hxTbpscU?si=YRcpA8s4B0uDNFvT"
                  text={"## We Are working on Ai Resume share your comments through chat bot in feedback category."}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold mb-2">Job Description</h3>
        <Textarea
          placeholder="Enter the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="mb-4"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center"
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="lg"
              onClick={generateResume}
              className="w-full"
              disabled={isLoading}
            >
              <Send className="w-4 h-4 m-2" />
              {isLoading ? "Generating..." : "Generate Resume"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <Card>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Generated Resume</h2>
                  <div className="flex gap-2">
                    <Button
                      onClick={toggleTheme}
                      size="icon"
                      variant="outline"
                      aria-label="Toggle theme"
                    >
                      {theme === "dark" ? (
                        <SunIcon className="h-4 w-4" />
                      ) : (
                        <MoonIcon className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      onClick={toggleFullScreen}
                      size="icon"
                      variant="outline"
                      aria-label="Toggle full screen"
                    >
                      {isFullScreen ? (
                        <MinimizeIcon className="h-4 w-4" />
                      ) : (
                        <MaximizeIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div
                  className={`overflow-auto ${isFullScreen ? "fixed inset-0 z-50 bg-white dark:bg-gray-900 p-8" : "max-h-[70vh]"}`}
                >
                  <Yakkshit resumeData={formData} />
                  {isFullScreen && (
                    <Button
                      className="fixed bottom-4 left-4"
                      onClick={toggleFullScreen}
                      aria-label="Exit Card View"
                    >
                      Exit Card View
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
