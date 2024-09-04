"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Define the type for exchange rates, allowing string indexing
type ExchangeRates = {
  [key: string]: number; // This allows string keys with number values
};

// Define props for the pricing plans
interface PriceCalculatorProps {
  basePrice?: number;
  pricePerUser?: number;
  currency?: string;
  users?: number;
  support?: string;
  requests?: number;
  storage?: string;
  customDomain?: boolean;
  dedicatedManager?: boolean;
  integration?: string[];
}

const PriceCalculator4Demo: React.FC<PriceCalculatorProps> = ({
  basePrice = 10,
  pricePerUser = 10,
  currency = "USD",
  users: initialUsers = 1,
  support = "24/7 Support",
  requests = 100,
  storage = "10GB Storage",
  customDomain = true,
  dedicatedManager = false,
  integration = ["Slack", "Zapier"],
}) => {
  const [users, setUsers] = useState(initialUsers);
  const [price, setPrice] = useState(basePrice);
  const [selectedCurrency, setSelectedCurrency] = useState(currency);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({}); // Use the defined type

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((response) => response.json())
      .then((data) => setExchangeRates(data.rates))
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, []);

  useEffect(() => {
    setPrice(users * pricePerUser + basePrice);
  }, [users, pricePerUser, basePrice]);

  const convertedPrice = (
    price * (exchangeRates[selectedCurrency] || 1)
  ).toFixed(2);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl p-8"
        style={{
          boxShadow: "0 0 100px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <AnimatedBorder />
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            SaaS Price Calculator
          </h2>
          <div className="mb-6">
            <label
              htmlFor="users"
              className="block mb-2 text-gray-700 dark:text-gray-300"
            >
              Number of Users
            </label>
            <input
              type="range"
              id="users"
              min="1"
              max="100"
              value={users}
              onChange={(e) => setUsers(Number(e.target.value))}
              className="w-full"
            />
            <motion.span
              key={users}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="block text-center text-2xl font-bold mt-2 text-gray-800 dark:text-white"
            >
              {users} {users === 1 ? "User" : "Users"}
            </motion.span>
          </div>
          <div className="mb-6">
            <label
              htmlFor="currency"
              className="block mb-2 text-gray-700 dark:text-gray-300"
            >
              Currency
            </label>
            <select
              id="currency"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              {Object.keys(exchangeRates).map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>
          <motion.div
            key={convertedPrice}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white"
          >
            {selectedCurrency} {convertedPrice}
            <span className="block text-sm mt-2 text-gray-600 dark:text-gray-400">
              per month
            </span>
          </motion.div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              What's included:
            </h3>
            <ul className="list-disc list-inside mt-4 text-gray-700 dark:text-gray-300">
              <li>{support}</li>
              <li>{requests} API requests per month</li>
              <li>{storage}</li>
              {customDomain && <li>Custom Domain</li>}
              {dedicatedManager && <li>Dedicated Account Manager</li>}
              {integration.length > 0 && (
                <li>
                  Integrations:{" "}
                  {integration.map((int, index) => (
                    <span key={int}>
                      {int}
                      {index < integration.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </li>
              )}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AnimatedBorder = () => {
  return (
    <motion.div
      className="absolute inset-0 z-0 rounded-2xl"
      style={{
        background: "linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff)",
        backgroundSize: "300% 300%",
        filter: "blur(3px)", // Apply a 3px blur to create the gradient border effect
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 15,
        ease: "linear",
        repeat: Infinity,
      }}
    />
  );
};

export default PriceCalculator4Demo;
