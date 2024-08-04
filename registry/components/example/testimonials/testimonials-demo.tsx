'use client';

import { TestimonialFeedbackForm } from "../../backend/testimonials/Testimonials";

export default function Testimonials1Demo() {
    const handleSuccess = () => {
        console.log('Form submitted successfully!');
    };

    const handleError = (error: any) => {
        console.error('Form submission error:', error);
    };

    return (
      <div className="container mx-auto p-4 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Testimonials</h1>
        <TestimonialFeedbackForm
          initialName="John Doe"
          initialFeedback="Great service!"
          initialRating={5}
          onSubmitSuccess={handleSuccess}
          onSubmitError={handleError}
          redirectUrl="https://www.cedzlabs.com"
          title="Submit Your Testimonial"
          nameLabel="Your Name"
          feedbackLabel="Your Feedback"
          ratingLabel="Your Rating"
          submitButtonText="Send Feedback"
        />
      </div>
    );
}
