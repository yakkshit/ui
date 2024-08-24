"use client";

import { motion, useTransform, useViewportScroll } from "framer-motion";
import React, { useState, useEffect } from "react";

interface Currency {
  code: string;
  symbol: string;
  rate: number;
  pricec1: number;
  pricec2: number;
  pricec3: number;
}

const fetchCurrencyRates = async () => {
  const accessKey = process.env.NEXT_PUBLIC_FIXER_API_KEY;
  const symbols = "USD,EUR,GBP,JPY,CNY,INR,SEK";
  const fixerUrl = `http://data.fixer.io/api/latest?access_key=${accessKey}&symbols=${symbols}`;
  const exchangeApiUrl = `${process.env.NEXT_PUBLIC_EXCHANGE_API_URL}`;

  try {
    const response = await fetch(fixerUrl);

    if (!response.ok) {
      throw new Error(`FIXER API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from FIXER API, trying EXCHANGE_API", error);

    try {
      const response = await fetch(exchangeApiUrl);

      if (!response.ok) {
        throw new Error(`EXCHANGE_API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        rates: data.conversion_rates,
        base: "EUR",
      };
    } catch (error) {
      console.error("Error fetching data from EXCHANGE_API", error);
      throw new Error("Both APIs failed");
    }
  }
};

const PriceDemo = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);
  const [isCurrencyListVisible, setIsCurrencyListVisible] = useState(false);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const defaultPrices = {
    pricec1: 20,
    pricec2: 30,
    pricec3: 50,
  };

  useEffect(() => {
    const getCurrencyRates = async () => {
      try {
        const data = await fetchCurrencyRates();
        const rates = data.rates;

        const updatedCurrencies: Currency[] = [
          {
            code: "EUR",
            symbol: "€",
            rate: 1,
            pricec1: defaultPrices.pricec1,
            pricec2: defaultPrices.pricec2,
            pricec3: defaultPrices.pricec3,
          },
          {
            code: "USD",
            symbol: "$",
            rate: parseFloat(rates.USD.toFixed(2)),
            pricec1: parseFloat((defaultPrices.pricec1 * rates.USD).toFixed(2)),
            pricec2: parseFloat((defaultPrices.pricec2 * rates.USD).toFixed(2)),
            pricec3: parseFloat((defaultPrices.pricec3 * rates.USD).toFixed(2)),
          },
          {
            code: "GBP",
            symbol: "£",
            rate: parseFloat(rates.GBP.toFixed(2)),
            pricec1: parseFloat((defaultPrices.pricec1 * rates.GBP).toFixed(2)),
            pricec2: parseFloat((defaultPrices.pricec2 * rates.GBP).toFixed(2)),
            pricec3: parseFloat((defaultPrices.pricec3 * rates.GBP).toFixed(2)),
          },
          {
            code: "JPY",
            symbol: "¥",
            rate: parseFloat(rates.JPY.toFixed(2)),
            pricec1: parseFloat((defaultPrices.pricec1 * rates.JPY).toFixed(2)),
            pricec2: parseFloat((defaultPrices.pricec2 * rates.JPY).toFixed(2)),
            pricec3: parseFloat((defaultPrices.pricec3 * rates.JPY).toFixed(2)),
          },
          {
            code: "INR",
            symbol: "₹",
            rate: parseFloat(rates.INR.toFixed(2)),
            pricec1: parseFloat((defaultPrices.pricec1 * rates.INR).toFixed(2)),
            pricec2: parseFloat((defaultPrices.pricec2 * rates.INR).toFixed(2)),
            pricec3: parseFloat((defaultPrices.pricec3 * rates.INR).toFixed(2)),
          },
          {
            code: "SEK",
            symbol: "Kr",
            rate: parseFloat(rates.SEK.toFixed(2)),
            pricec1: parseFloat((defaultPrices.pricec1 * rates.SEK).toFixed(2)),
            pricec2: parseFloat((defaultPrices.pricec2 * rates.SEK).toFixed(2)),
            pricec3: parseFloat((defaultPrices.pricec3 * rates.SEK).toFixed(2)),
          },
          // Add more currencies as needed
        ];

        setCurrencies(updatedCurrencies);
        setSelectedCurrency(
          updatedCurrencies.find((currency) => currency.code === "USD") || null
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error in getCurrencyRates:", error);
        const defaultCurrency: Currency = {
          code: "EUR",
          symbol: "€",
          rate: 1,
          pricec1: defaultPrices.pricec1,
          pricec2: defaultPrices.pricec2,
          pricec3: defaultPrices.pricec3,
        };
        setCurrencies([defaultCurrency]);
        setSelectedCurrency(defaultCurrency);
        setError("Error fetching currency rates, defaulting to Euro prices");
        setIsLoading(false);
      }
    };

    getCurrencyRates();
  }, []);

  const handleCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency);
    setIsCurrencyListVisible(false); // Hide the list after selecting a currency
  };

  const formatCurrency = (value: number, currency: Currency) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency.code,
    }).format(value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <motion.div
      className="mx-auto max-w-screen lg:px-6 lg:py-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto mb-8 max-w-screen-md  lg:mb-12 text-center">
        <h2 className="mb-10 text-4xl font-bold tracking-tight text-white">
          Pay once, use forever
        </h2>
      </div>
      <div className="space-y-8 gap-x-2 lg:grid md:grid-cols-3 lg:space-y-0 lg:gap-10">
        {/* <!-- Pricing Card --> */}
        <div className="mx-auto flex max-w-lg space-y-8 items-start flex-col rounded-3xl border border-gray-200 bg-white p-6 text-gray-900 xl:p-8">
          <h3 className="text-lg text-black font-normal ">Basic</h3>
          <div className="my-8 flex items-baseline justify-center relative">
            {selectedCurrency && (
              <span className="mr-2 text-5xl font-extrabold">
                {/* {selectedCurrency.symbol} */}
                {formatCurrency(selectedCurrency.pricec1, selectedCurrency)}
              </span>
            )}
            <span className="text-gray-600">/month</span>
            <div className="absolute top-0 right-0 mt-2">
              <div className="relative">
                {selectedCurrency && (
                  <span
                    className="cursor-pointer text-gray-600"
                    onClick={() =>
                      setIsCurrencyListVisible(!isCurrencyListVisible)
                    }
                  >
                    {selectedCurrency.code}
                  </span>
                )}
                {isCurrencyListVisible && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="max-h-40 overflow-y-auto">
                      {currencies.map((currency: Currency) => (
                        <div
                          key={currency.code}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleCurrencyChange(currency)}
                        >
                          {currency.code}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <p className="font-light text-gray-600 sm:text-sm">
            Best option for personal use & for your next project.
          </p>
          <a className="cursor-pointer bg-gray-900 w-full rounded-md  p-3 text-center text-sm font-semibold text-white shadow-sm  hover:-translate-y-1">
            Get started
          </a>
          {/* <!-- List --> */}
          <ul
            role="list"
            className="mb-8 space-y-4 text-left text-gray-600  text-sm"
          >
            <li className="flex items-center space-x-3 ">
              {/* <!-- Icon --> */}
              <svg
                className="h-5 w-5 flex-shrink-0 bg-gray-900 rounded-full p-0.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>10,000 visitors</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* <!-- Icon --> */}
              <svg
                className="h-5 w-5 flex-shrink-0 bg-gray-900 rounded-full p-0.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Unlimited widgets</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* <!-- Icon --> */}
              <svg
                className="h-5 w-5 flex-shrink-0 bg-gray-900 rounded-full p-0.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>All analytics features</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* <!-- Icon --> */}
              <svg
                className="h-5 w-5 flex-shrink-0 bg-gray-900 rounded-full p-0.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Priority support</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* <!-- Icon --> */}
              <svg
                className="h-5 w-5 flex-shrink-0 bg-gray-900 rounded-full p-0.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Lifetime updates</span>
            </li>
          </ul>
        </div>
        {/* <!-- Pricing Card 2--> */}
        <div className="mx-auto flex max-w-lg space-y-8 items-start flex-col rounded-3xl  bg-[#D8FA6D] p-6 text-gray-900 xl:p-8">
          <h3 className="text-lg text-black font-normal ">Essential</h3>
          <div className="my-8 flex flex-col sm:flex-row items-baseline justify-center text-center sm:text-left">
            {selectedCurrency && (
              <span className="mr-2 text-3xl sm:text-5xl font-extrabold">
                {/* {selectedCurrency.symbol} */}
                {formatCurrency(selectedCurrency.pricec3, selectedCurrency)}
              </span>
            )}
            <span className="text-gray-600">/month</span>
          </div>
          <p className="font-light text-gray-600 sm:text-sm">
            Best option for personal use & for your next project.
          </p>
          <a className="cursor-pointer bg-gray-900 w-full rounded-md  p-3 text-center text-sm font-semibold text-white shadow-sm  hover:-translate-y-1">
            Get started
          </a>
          {/* <!-- List --> */}
          <ul
            role="list"
            className="mb-8 space-y-4 text-left text-gray-600  text-sm"
          >
            <li className="flex items-center space-x-3 ">
              {/* <!-- Icon --> */}
              <svg
                className="h-5 w-5 flex-shrink-0 bg-gray-900 rounded-full p-0.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>10,000 visitors</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* <!-- Icon --> */}
              <svg
                className="h-5 w-5 flex-shrink-0 bg-gray-900 rounded-full p-0.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Unlimited widgets</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* <!-- Icon --> */}
              <svg
                className="h-5 w-5 flex-shrink-0 bg-gray-900 rounded-full p-0.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>All analytics features</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* <!-- Icon --> */}
              <svg
                className="h-5 w-5 flex-shrink-0 bg-gray-900 rounded-full p-0.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Priority support</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* <!-- Icon --> */}
              <svg
                className="h-5 w-5 flex-shrink-0 bg-gray-900 rounded-full p-0.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Lifetime updates</span>
            </li>
          </ul>
        </div>
        {/* <!-- Pricing Card 3--> */}
        <div className="mx-auto flex max-w-lg space-y-8 items-start flex-col rounded-3xl  bg-[#DCA6F3] p-6 text-center text-gray-900 xl:p-8">
          <h3 className="text-lg text-black font-normal ">Growth</h3>
          <div className="my-8 flex flex-col sm:flex-row items-baseline justify-center text-center sm:text-left">
            {selectedCurrency && (
              <span className="mr-2 text-3xl sm:text-5xl font-extrabold">
                {/* {selectedCurrency.symbol} */}
                {formatCurrency(selectedCurrency.pricec3, selectedCurrency)}
              </span>
            )}
            <span className="text-gray-600">/month</span>
          </div>

          <p className="font-light text-gray-600 sm:text-sm">
            Best option for personal use & for your next project.
          </p>
          <a className="cursor-pointer bg-gray-900 w-full rounded-md  p-3  text-sm font-semibold text-white shadow-sm  hover:-translate-y-1">
            Get started
          </a>
          {/* <!-- List --> */}
          <ul
            role="list"
            className="mb-8 space-y-4 text-left text-gray-600  text-sm"
          >
            <li className="flex items-center space-x-3 ">
              {/* <!-- Icon --> */}
              <svg
                className="h-5 w-5 flex-shrink-0 bg-gray-900 rounded-full p-0.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>10,000 visitors</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* <!-- Icon --> */}
              <svg
                className="h-5 w-5 flex-shrink-0 bg-gray-900 rounded-full p-0.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Unlimited widgets</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* <!-- Icon --> */}
              <svg
                className="h-5 w-5 flex-shrink-0 bg-gray-900 rounded-full p-0.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>All analytics features</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* <!-- Icon --> */}
              <svg
                className="h-5 w-5 flex-shrink-0 bg-gray-900 rounded-full p-0.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Priority support</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* <!-- Icon --> */}
              <svg
                className="h-5 w-5 flex-shrink-0 bg-gray-900 rounded-full p-0.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Lifetime updates</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default PriceDemo;
