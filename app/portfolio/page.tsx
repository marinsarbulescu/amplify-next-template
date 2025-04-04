'use client';

import { useState, FormEvent } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createStock } from '@/src/graphql/mutations';
import Navbar from '@/components/Navbar';
import '../portfolio/portfolio.css'; // Import the CSS file

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
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

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
    setIsLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      const result = await client.graphql({
        query: createStock,
        variables: { input: stock }
      });
      
      console.log('Stock added successfully:', result);
      setMessage({ text: 'Stock added successfully!', type: 'success' });
      
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
      setMessage({ text: 'Error adding stock. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="portfolio-container">
        <h1 className="portfolio-heading">Portfolio Management</h1>
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="portfolio-form">
          <div className="form-group">
            <label htmlFor="symbol">Stock Symbol</label>
            <input
              type="text"
              id="symbol"
              name="symbol"
              value={stock.symbol}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={stock.type}
              onChange={handleChange}
            >
              <option value="Stock">Stock</option>
              <option value="ETF">ETF</option>
              <option value="Crypto">Crypto</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="region">Region</label>
            <select
              id="region"
              name="region"
              value={stock.region}
              onChange={handleChange}
            >
              <option value="US">US</option>
              <option value="EU">EU</option>
              <option value="APAC">APAC</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">Stock Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={stock.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pdp">Price Dip Percent (PDP)</label>
            <input
              type="number"
              id="pdp"
              name="pdp"
              value={stock.pdp}
              onChange={handleChange}
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="plr">Profit Loss Ratio (PLR)</label>
            <input
              type="number"
              id="plr"
              name="plr"
              value={stock.plr}
              onChange={handleChange}
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="budget">Annual Budget</label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={stock.budget}
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" 
            className={`submit-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Stock'}
          </button>
        </form>
      </main>
    </>
  );
}