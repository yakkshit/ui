import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useRouter } from 'next/navigation'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Testimonial {
  id: number;
  name: string;
  feedback: string;
  rating: number;
}

const TestimonialCarousel = ({ testimonials }: { testimonials: Testimonial[] }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex space-x-4"
        animate={{ x: ['100%', '-100%'] }}
        transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            className="p-1 border border-gray-300 rounded-md shadow-sm bg-gradient-to-r from-black-400 via-black-500 to-gray-600 bg-opacity-55 dark:text-white text-black flex flex-col justify-between"
            whileHover={{ scale: 1.05 }}
            style={{ minHeight: '75px', minWidth: '300px', margin: '20px 10px' }} // Added margin to create gap between cards
          >
            <h2 className="text-xl font-bold">{testimonial.name}</h2>
            <p>{testimonial.feedback}</p>
            <p>Rating: {testimonial.rating} / 5</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase.from('testimonials').select('*');
    if (error) console.error('Error fetching testimonials:', error);
    else setTestimonials(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from('testimonials').insert([{ name, feedback, rating }]);
    if (error) {
      console.error('Error adding testimonial:', error);
    } else {
      setTestimonials([...testimonials, ...(data ?? [])]);
      setName('');
      setFeedback('');
      setRating(0);
      toast({
        description: "Successfully subscribed! Your added to waitlist.",
      });
      router.push('https://www.cedzlabs.com') // Redirect after successful subscription optional
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-3xl font-bold mb-4">Testimonials</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
            min="0"
            max="5"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
      {/* <TestimonialCarousel testimonials={testimonials} /> */}  
      {/* To display the cards form the database */}
    </div>
  );
};

export default Testimonials;
