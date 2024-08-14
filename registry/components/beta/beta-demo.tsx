// components/WhatsAppChatSupport.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const WhatsAppChatSupport: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [customFields, setCustomFields] = useState({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const payload = {
      secret: process.env.NEXT_PUBLIC_SPOKI_SECRET,
      phone,
      first_name: firstName,
      last_name: lastName,
      email,
      custom_fields: customFields,
    };
  
    console.log('Spoki URI:', process.env.NEXT_PUBLIC_SPOKI_URI); // Debugging line
    console.log('Payload:', payload); // Debugging line
  
    try {
      const response = await axios.post('https://app.spoki.it/wh/ap/825016da-76d4-4b48-bc83-152c6150179d/', payload);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-white rounded shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4">WhatsApp Chat Support</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* Add custom fields as needed */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </motion.div>
  );
};

export default WhatsAppChatSupport;
