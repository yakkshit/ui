"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ExchangeRates = {
  [key: string]: number; // This allows string keys with number values
};

type Plan = 'basic' | 'pro' | 'enterprise';

const PriceCalculator3Demo = () => {
  const [users, setUsers] = useState(1);
  const [plan, setPlan] = useState<Plan>('basic'); // Explicitly type `plan`
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(true);

  const plans: Record<Plan, { price: number; features: string[] }> = {
    basic: { 
      price: 10, 
      features: ['Basic Features', 'Email Support', '1 GB Storage'] 
    },
    pro: { 
      price: 20, 
      features: ['Pro Features', 'Priority Support', 'API Access', '10 GB Storage'] 
    },
    enterprise: { 
      price: 50, 
      features: ['Enterprise Features', '24/7 Support', 'Dedicated Account Manager', 'Custom Integrations', 'Unlimited Storage'] 
    }
  };

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(response => response.json())
      .then(data => {
        setExchangeRates(data.rates);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching exchange rates:', error);
        setLoading(false);
      });
  }, []);

  const calculatePrice = () => {
    const basePrice = plans[plan].price * users;
    return (basePrice * (exchangeRates[currency] || 1)).toFixed(2);
  };

  return (
    <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-transform transform hover:scale-105 hover:shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">SaaS Price Calculator</h1>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">Number of Users</label>
          <input
            type="number"
            min="1"
            value={users}
            onChange={(e) => setUsers(Math.max(1, parseInt(e.target.value)))}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-all duration-300"
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">Plan</label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value as Plan)} // Type assertion here
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-all duration-300"
          >
            <option value="basic">Basic</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-all duration-300"
          >
            {Object.keys(exchangeRates).map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          key={`${plan}-${users}-${currency}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mt-6"
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Price Breakdown</h2>
          <p className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {loading ? 'Loading...' : `${currency} ${calculatePrice()}`}
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            {plans[plan].features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4, ease: "easeInOut" }}
              >
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PriceCalculator3Demo;
