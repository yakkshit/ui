"use client";

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TestimonialFeedbackFormProps {
  initialName?: string;
  initialFeedback?: string;
  initialRating?: number;
  onSubmitSuccess?: () => void;
  onSubmitError?: (error: any) => void;
  redirectUrl?: string;
  title?: string;
  nameLabel?: string;
  feedbackLabel?: string;
  ratingLabel?: string;
  submitButtonText?: string;
}

const TestimonialFeedbackForm: React.FC<TestimonialFeedbackFormProps> = ({
  initialName = '',
  initialFeedback = '',
  initialRating = 0,
  onSubmitSuccess,
  onSubmitError,
  redirectUrl = 'https://www.cedzlabs.com',
  title = 'Testimonials',
  nameLabel = 'Name',
  feedbackLabel = 'Feedback',
  ratingLabel = 'Rating',
  submitButtonText = 'Submit',
}) => {
  const [name, setName] = useState(initialName);
  const [feedback, setFeedback] = useState(initialFeedback);
  const [rating, setRating] = useState(initialRating);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from('testimonials').insert([{ name, feedback, rating }]);
    if (error) {
      console.error('Error adding testimonial:', error);
      onSubmitError && onSubmitError(error);
    } else {
      setName('');
      setFeedback('');
      setRating(0);
      toast({
        description: "Successfully added your testimonial!",
      });
      onSubmitSuccess && onSubmitSuccess();
      router.push(redirectUrl); // Redirect after successful submission (optional)
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{nameLabel}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={cn("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300")}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{feedbackLabel}</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className={cn("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300")}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{ratingLabel}</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRatingChange(star)}
                className="cursor-pointer"
              >
                <Star
                  className={cn("w-8 h-8", star <= rating ? 'text-yellow-500' : 'text-gray-300')}
                  fill={star <= rating ? 'currentColor' : 'none'}
                />
              </motion.div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className={cn("inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500")}
        >
          {submitButtonText}
        </button>
      </form>
    </div>
  );
};

interface Testimonial {
  id: number;
  name: string;
  feedback: string;
  rating: number;
}

interface TestimonialsSliderProps {
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  starColor?: string;
  starEmptyColor?: string;
  buttonBgColor?: string;
  buttonHoverColor?: string;
  transitionDuration?: number;
  transitionEase?: string;
}

const TestimonialsSlider: React.FC<TestimonialsSliderProps> = ({
  bgColor = 'bg-white dark:bg-gray-800',
  textColor = 'text-gray-700 dark:text-gray-300',
  borderColor = 'border-gray-300 dark:border-gray-600',
  starColor = 'text-yellow-500',
  starEmptyColor = 'text-gray-300',
  buttonBgColor = 'bg-gray-200',
  buttonHoverColor = 'bg-gray-300',
  transitionDuration = 0.5,
  transitionEase = 'easeInOut',
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase.from('testimonials').select('*');
      if (error) {
        console.error('Error fetching testimonials:', error);
      } else {
        setTestimonials(data);
      }
    };

    fetchTestimonials();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative">
      <div className="flex overflow-hidden whitespace-nowrap" ref={containerRef}>
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ duration: transitionDuration, ease: transitionEase }}
          style={{ display: 'flex', whiteSpace: 'nowrap' }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${index}`}
              className={cn(bgColor, borderColor, "border rounded-lg shadow-lg p-4 m-2 w-80 flex-shrink-0")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-bold text-center">{testimonial.name}</h3>
              <p className={cn(textColor, "mt-2 line-clamp-3")}>
                {testimonial.feedback}
              </p>
              <div className="flex justify-center mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn("w-6 h-6", star <= testimonial.rating ? starColor : starEmptyColor)}
                    fill={star <= testimonial.rating ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <motion.button
          onClick={handlePrev}
          className={cn("p-2", buttonBgColor, "rounded-full")}
          whileHover={{ backgroundColor: buttonHoverColor }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button
          onClick={handleNext}
          className={cn("p-2", buttonBgColor, "rounded-full")}
          whileHover={{ backgroundColor: buttonHoverColor }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
};

interface MarqueeTestimonialsProps {
  duration?: number;
  ease?: string;
  repeat?: number;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  starColor?: string;
  starEmptyColor?: string;
}

const MarqueeTestimonials: React.FC<MarqueeTestimonialsProps> = ({
  duration = 20,
  ease = 'linear',
  repeat = Infinity,
  bgColor = 'bg-white dark:bg-gray-800',
  textColor = 'text-gray-700 dark:text-gray-300',
  borderColor = 'border-gray-300 dark:border-gray-600',
  starColor = 'text-yellow-500',
  starEmptyColor = 'text-gray-300',
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase.from('testimonials').select('*');
      if (error) {
        console.error('Error fetching testimonials:', error);
      } else {
        setTestimonials(data);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="flex overflow-x-hidden whitespace-nowrap relative myGradient">
      <motion.div
        className="flex"
        animate={{ x: ['0','-100%'] }}
        transition={{ repeat, duration, ease }}
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className={cn(bgColor, borderColor, "border rounded-lg shadow-lg p-4 m-2 w-80 flex-shrink-0")}
          >
            <h3 className="text-xl font-bold text-center">{testimonial.name}</h3>
            <p className={cn(textColor, "mt-2 line-clamp-3")}>
              {testimonial.feedback}
            </p>
            <div className="flex justify-center mt-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn("w-6 h-6", star <= testimonial.rating ? starColor : starEmptyColor)}
                  fill={star <= testimonial.rating ? 'currentColor' : 'none'}
                />
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export { TestimonialFeedbackForm, TestimonialsSlider, MarqueeTestimonials };
