import WaitlistDemo from "@/registry/components/example/wait-list/wait-list-demo";

export default async function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-5xl text-white font-bold mb-8 animate-pulse">
        Coming Soon
    </h1>
    <p className="text-white text-lg mb-8">
        We're working hard to bring you something amazing. Stay tuned!
    </p>
    <p className="text-white text-lg mb-8">
        Join Our Waitlist
    </p>
    <WaitlistDemo/>
</div>
  );
}
