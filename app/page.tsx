'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to Portfolio page
    router.push('/portfolio');
  }, [router]);

  return (
    <div className="loading-container">
      <p>Loading portfolio...</p>
    </div>
  );
}