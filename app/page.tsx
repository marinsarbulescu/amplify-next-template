'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

export default function App() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to Portfolio page
    router.push('/portfolio');
  }, [router]);

  return null; // This component won't render anything as it immediately redirects
}
