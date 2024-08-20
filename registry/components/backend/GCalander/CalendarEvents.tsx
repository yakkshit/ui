// components/CalendarEvents.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import axios from 'axios';

interface Event {
  id: string;
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
}

const CalendarEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/google-calendar');
        setEvents(response.data.items);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Google Calendar Events</h1>
      <div className="space-y-4">
        {events.map(event => (
          <motion.div
            key={event.id}
            className="p-4 bg-white rounded shadow"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center">
              <Calendar className="w-6 h-6 mr-2" />
              <div>
                <h2 className="text-lg font-semibold">{event.summary}</h2>
                <p className="text-sm text-gray-600">
                  {new Date(event.start.dateTime).toLocaleString()} - {new Date(event.end.dateTime).toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CalendarEvents;
