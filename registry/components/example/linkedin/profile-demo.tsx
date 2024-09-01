"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { SearchIcon } from "lucide-react";

export default function ProfileDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const fetchProfileData = async () => {
    const options = {
      method: "GET",
      url: "https://linkedin-profile-data.p.rapidapi.com/linkedin-data",
      params: { username: searchTerm },
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "linkedin-profile-data.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      setProfileData(response.data);
      setError(null);
      setShowSearchBar(false);
    } catch (error) {
      setError("Profile not found. Please try again.");
      setProfileData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchTerm.trim()) {
      fetchProfileData();
    }
  };

  const handleSearchIconClick = () => {
    setShowSearchBar(true);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-600 h-32 p-4 flex items-center justify-end">
        {!showSearchBar ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={handleSearchIconClick}
            className="cursor-pointer"
          >
            <SearchIcon size={32} color="white" />
          </motion.div>
        ) : (
          <motion.input
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.5 }}
            type="text"
            placeholder="Enter LinkedIn username..."
            className="w-full p-2 rounded-lg"
            value={searchTerm}
            onChange={handleSearch}
            onKeyPress={handleKeyPress}
          />
        )}
      </div>
      {loading && <p className="p-4">Loading...</p>}
      {error && <p className="p-4 text-red-600">{error}</p>}
      {profileData && (
        <div className="px-6 py-4">
          <div className="relative">
            <Image
              src={
                profileData.profile_pic_url ||
                "/placeholder.svg?height=128&width=128"
              }
              alt="Profile Picture"
              width={128}
              height={128}
              className="rounded-full border-4 border-white absolute -top-16 left-0"
            />
          </div>
          <div className="mt-16">
            <h1 className="text-2xl font-bold text-gray-900">
              {profileData.full_name}
            </h1>
            <p className="text-gray-600">{profileData.headline}</p>
            <p className="text-sm text-gray-500 mt-2">
              {profileData.city}, {profileData.state}
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">About</h2>
            <p className="text-gray-700 mt-2">{profileData.summary}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">Experience</h2>
            {profileData.experiences && profileData.experiences.length > 0 ? (
              profileData.experiences.map((exp: any, index: number) => (
                <div key={index} className="mt-4">
                  <h3 className="font-medium text-gray-900">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {exp.starts_at.year} - {exp.ends_at.year}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No experience data available.</p>
            )}
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">Education</h2>
            {profileData.education && profileData.education.length > 0 ? (
              profileData.education.map((edu: any, index: number) => (
                <div key={index} className="mt-4">
                  <h3 className="font-medium text-gray-900">
                    {edu.degree_name}
                  </h3>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-sm text-gray-500">{edu.field_of_study}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No education data available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// "use client";

// import axios from "axios";
// import Image from "next/image";
// import { useState } from "react";

// export default function LinkedInProfile() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [profileData, setProfileData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchProfileData = async () => {
//     const options = {
//       method: "GET",
//       url: "https://linkedin-profile-data.p.rapidapi.com/linkedin-data",
//       params: { url: `https://linkedin.com/in/${searchTerm}` },
//       headers: {
//         "x-rapidapi-key": process.env.RAPIDAPI_KEY,
//         "x-rapidapi-host": "linkedin-profile-data.p.rapidapi.com",
//       },
//     };

//     try {
//       setLoading(true);
//       const response = await axios.request(options);
//       setProfileData(response.data);
//       setError(null);
//     } catch (error) {
//       setError("Profile not found. Please try again.");
//       setProfileData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const term = event.target.value.toLowerCase();
//     setSearchTerm(term);
//   };

//   const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter" && searchTerm.trim()) {
//       fetchProfileData();
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//       <div className="bg-blue-600 h-32 p-4">
//         <input
//           type="text"
//           placeholder="Enter LinkedIn profile URL..."
//           className="w-full p-2 rounded-lg"
//           value={searchTerm}
//           onChange={handleSearch}
//           onKeyPress={handleKeyPress}
//         />
//       </div>
//       {loading && <p className="p-4">Loading...</p>}
//       {error && <p className="p-4 text-red-600">{error}</p>}
//       {profileData && (
//         <div className="px-6 py-4">
//           <div className="relative">
//             <Image
//               src={
//                 profileData.profile_pic_url ||
//                 "/placeholder.svg?height=128&width=128"
//               }
//               alt="Profile Picture"
//               width={128}
//               height={128}
//               className="rounded-full border-4 border-white absolute -top-16 left-0"
//             />
//           </div>
//           <div className="mt-16">
//             <h1 className="text-2xl font-bold text-gray-900">
//               {profileData.full_name}
//             </h1>
//             <p className="text-gray-600">{profileData.headline}</p>
//             <p className="text-sm text-gray-500 mt-2">{profileData.city}, {profileData.state}</p>
//           </div>
//           <div className="mt-6">
//             <h2 className="text-lg font-semibold text-gray-900">About</h2>
//             <p className="text-gray-700 mt-2">{profileData.summary}</p>
//           </div>
//           <div className="mt-6">
//             <h2 className="text-lg font-semibold text-gray-900">Experience</h2>
//             {profileData.experiences && profileData.experiences.length > 0 ? (
//               profileData.experiences.map((exp: any, index: number) => (
//                 <div key={index} className="mt-4">
//                   <h3 className="font-medium text-gray-900">{exp.title}</h3>
//                   <p className="text-gray-600">{exp.company}</p>
//                   <p className="text-sm text-gray-500">{exp.starts_at.year} - {exp.ends_at.year}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-600">No experience data available.</p>
//             )}
//           </div>
//           <div className="mt-6">
//             <h2 className="text-lg font-semibold text-gray-900">Education</h2>
//             {profileData.education.map((edu: any, index: number) => (
//               <div key={index} className="mt-4">
//                 <h3 className="font-medium text-gray-900">{edu.degree_name}</h3>
//                 <p className="text-gray-600">{edu.school}</p>
//                 <p className="text-sm text-gray-500">{edu.field_of_study}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
