"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function Airesume() {
    const downloadPDF = () => {
        const input = document.getElementById('resume') as HTMLElement | null;
      
        if (input) {
          html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('Netflix_Themed_Resume_For_Google.pdf');
          });
        } else {
          console.error('Element with id "resume" not found');
        }
      };
      

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div id="resume" className="max-w-4xl mx-auto bg-[#141414] p-8 rounded-lg shadow-lg">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-[#E50914] mb-2">Yakkshit</h1>
          <p className="text-xl">Aspiring Googler | Software Engineer</p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#E50914] mb-4">About Me</h2>
          <p>Passionate software engineer with a Netflix-like obsession for creating seamless user experiences and scalable solutions. Ready to bring innovative ideas to Google's dynamic environment.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#E50914] mb-4">Experience</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Senior Software Engineer - StreamFlix</h3>
            <p className="text-gray-400">2018 - Present</p>
            <ul className="list-disc list-inside mt-2">
              <li>Developed recommendation algorithms improving user engagement by 35%</li>
              <li>Led a team of 5 engineers in redesigning the main dashboard</li>
              <li>Implemented CI/CD pipelines reducing deployment time by 50%</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Full Stack Developer - TechInnovate</h3>
            <p className="text-gray-400">2015 - 2018</p>
            <ul className="list-disc list-inside mt-2">
              <li>Built RESTful APIs serving over 1 million requests daily</li>
              <li>Optimized database queries, improving response times by 40%</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#E50914] mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {['JavaScript', 'Python', 'React', 'Node.js', 'GraphQL', 'AWS', 'Docker', 'Kubernetes', 'Machine Learning'].map((skill) => (
              <span key={skill} className="bg-[#E50914] text-white px-3 py-1 rounded-full text-sm">{skill}</span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#E50914] mb-4">Why Google?</h2>
          <p>Google's commitment to innovation and solving complex problems at scale aligns perfectly with my passion for technology. I'm excited about the opportunity to contribute to projects that impact billions of users worldwide.</p>
        </section>
      </div>

      <div className="mt-8 text-center">
        <Button onClick={downloadPDF} className="bg-[#E50914] hover:bg-[#B20710] text-white font-bold py-2 px-4 rounded-lg">
          Download PDF
        </Button>
      </div>
    </div>
  )
}