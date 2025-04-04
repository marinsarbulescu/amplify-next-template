// app/portfolio/page.tsx
'use client';

import Navbar from '@/components/Navbar';
import { API, graphqlOperation } from 'aws-amplify';
import { createStock } from '../graphql/mutations';

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <main className="container">
        <h1>Portfolio</h1>
        <p>This is the portfolio page. Content coming soon...</p>
      </main>
    </>
  );
}