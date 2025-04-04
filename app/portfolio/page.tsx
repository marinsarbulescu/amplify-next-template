// app/portfolio/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createStock } from '@/src/graphql/mutations';
import Navbar from '@/components/Navbar';

// Define the stock type for TypeScript
type Stock = {
  symbol: string;
  type: 'ETF' | 'Stock' | 'Crypto';
  region: 'US' | 'EU' | 'APAC';
  name: string;
  pdp: number;
  plr: number;
  budget: number;
};

export default function Portfolio() {
  const client = generateClient();

  // State for form fields
  const [stock, setStock] = useState<Stock>({
    symbol: '',
    type: 'Stock',
    region: 'US',
    name: '',
    pdp: 0,
    plr: 0,
    budget: 0
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStock(prevStock => ({
      ...prevStock,
      [name]: name === 'pdp' || name === 'plr' || name === 'budget' 
        ? Number(value) 
        : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const result = await client.graphql({
        query: createStock,
        variables: { input: stock }
      });
      
      console.log('Stock added successfully:', result);
      
      // Reset form after successful submission
      setStock({
        symbol: '',
        type: 'Stock',
        region: 'US',
        name: '',
        pdp: 0,
        plr: 0,
        budget: 0
      });
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Portfolio Management</h1>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="symbol" className="block mb-2">Stock Symbol</label>
            <input
              type="text"
              id="symbol"
              name="symbol"
              value={stock.symbol}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block mb-2">Type</label>
            <select
              id="type"
              name="type"
              value={stock.type}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Stock">Stock</option>
              <option value="ETF">ETF</option>
              <option value="Crypto">Crypto</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="region" className="block mb-2">Region</label>
            <select
              id="region"
              name="region"
              value={stock.region}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="US">US</option>
              <option value="EU">EU</option>
              <option value="APAC">APAC</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Stock Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={stock.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="pdp" className="block mb-2">Price Dip Percent (PDP)</label>
            <input
              type="number"
              id="pdp"
              name="pdp"
              value={stock.pdp}
              onChange={handleChange}
              step="0.01"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="plr" className="block mb-2">Profit Loss Ratio (PLR)</label>
            <input
              type="number"
              id="plr"
              name="plr"
              value={stock.plr}
              onChange={handleChange}
              step="0.01"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="budget" className="block mb-2">Annual Budget</label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={stock.budget}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Stock
          </button>
        </form>
      </main>
    </>
  );
}