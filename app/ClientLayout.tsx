'use client';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; // Import the styles
//import amplifyconfig from '../amplify_outputs.json';
import amplifyconfig from "@/amplify_outputs.json";

// Configure Amplify with SSR support
Amplify.configure({ ...amplifyconfig, ssr: true });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Authenticator>
          {children}
        </Authenticator>
      </body>
    </html>
  );
}
