'use client';

import { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import amplifyconfig from "../amplify_outputs.json";

// Configure Amplify with SSR support
Amplify.configure({ ...amplifyconfig, ssr: true } as any);

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use client-side only rendering to avoid hydration issues
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same structure to avoid layout shifts
    return <div className="auth-loading">Loading authentication...</div>;
  }

  return (
    <Authenticator>
      {children}
    </Authenticator>
  );
}