"use client";
import { useSession } from "next-auth/react";
import Waitlist from "../backend/waitlist/waitlist";

export default function WaitlistDemo() {
  return (
    <div className="h-full w-full relative flex justify-center items-center">
      <Waitlist
        emailPlaceholder="Enter your email"
        buttonText="Subscribe"
        successRedirectUrl="https://cedzlabs.com/thank-you"
        inputClassName="custom-input-class"
        buttonClassName="custom-button-class"
        formClassName="custom-form-class"
        onSuccess={() => console.log("Successfully subscribed!")}
        onError={(error) => console.error("Subscription error:", error)}
      />
    </div>
  );
}
