"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

type CurrencyCode = 'usd' | 'eur' | 'gbp' | 'inr';

interface PlanPrice {
  [key: string]: number;
}

interface Plan {
  name: string;
  price: PlanPrice;
  features: string[];
  notIncluded: string[];
}

interface Currency {
  symbol: string;
  name: string;
}

const initialPlans: Plan[] = [
  {
    name: 'Basic',
    price: { usd: 9, eur: 8, gbp: 7, inr: 1200 },
    features: ['1 User', '10 Projects', '5GB Storage', 'Basic Support'],
    notIncluded: ['API Access', 'Custom Domain']
  },
  {
    name: 'Pro',
    price: { usd: 19, eur: 17, gbp: 15, inr: 1200 },
    features: ['5 Users', 'Unlimited Projects', '50GB Storage', 'Priority Support', 'API Access'],
    notIncluded: ['Custom Domain']
  },
  {
    name: 'Enterprise',
    price: { usd: 49, eur: 44, gbp: 39, inr: 1200 },
    features: ['Unlimited Users', 'Unlimited Projects', '500GB Storage', '24/7 Support', 'API Access', 'Custom Domain'],
    notIncluded: []
  }
];

export default function Price1Demo() {
  const [currency, setCurrency] = useState<CurrencyCode>('usd');
  const [currencies, setCurrencies] = useState<{ [key in CurrencyCode]: Currency }>({
    usd: { symbol: '$', name: 'USD' },
    eur: { symbol: '€', name: 'EUR' },
    gbp: { symbol: '£', name: 'GBP' },
    inr: { symbol: '₹', name: 'INR' }
  });
  const [conversionRates, setConversionRates] = useState<{ [key: string]: number }>({});
  const [toast, setToast] = useState<string | null>(null);
  const baseCurrency = 'eur'; // Base currency for conversion

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const accessKey = process.env.NEXT_PUBLIC_FIXER_API_KEY;
        const symbols = 'USD,EUR,GBP';
        const fixerUrl = `http://data.fixer.io/api/latest?access_key=${accessKey}&symbols=${symbols}`;
        
        const response = await fetch(fixerUrl);
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }
        
        const data = await response.json();
        const rates = data.rates;
        
        setConversionRates({
          usd: rates.USD / rates[baseCurrency.toUpperCase()],
          eur: 1,
          gbp: rates.GBP / rates[baseCurrency.toUpperCase()],
          inr: rates.INR / rates[baseCurrency.toUpperCase()]
        });
      } catch (error) {
        console.error('Error fetching currency data:', error);
        // Fallback conversion rates if API fails
        setConversionRates({
          usd: 1.1,
          eur: 1,
          gbp: 0.9,
          inr: 90
        });
        setToast('Failed to fetch currency data. Using default values.');
        setTimeout(() => setToast(null), 5000); // Hide toast after 5 seconds
      }
    };

    fetchCurrencyData();
  }, []);

  const getPriceInCurrency = (priceInEur: number, currencyCode: CurrencyCode) => {
    const rate = conversionRates[currencyCode];
    if (!rate) return priceInEur;
    return (priceInEur * rate).toFixed(2);
  };

  return (
    <div className="w-full p-6 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>
          <p className="text-muted-foreground">Select the perfect plan for your needs</p>
        </div>
        <div className="flex justify-center mb-8">
          <div className="bg-secondary rounded-full p-1">
            {(Object.keys(currencies) as CurrencyCode[]).map((curr) => (
              <button
                key={curr}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  currency === curr ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                }`}
                onClick={() => setCurrency(curr)}
              >
                {currencies[curr].name}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {initialPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative bg-card rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 border-2 border-primary rounded-lg">
                <div className="absolute inset-0">
                  <div className="h-full w-3 animate-border-beam" />
                </div>
              </div>
              <div className="p-6 relative z-10">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-4">
                  {currencies[currency]?.symbol || '$'} {getPriceInCurrency(plan.price[baseCurrency], currency)}
                  <span className="text-lg font-normal text-muted-foreground">/mo</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="text-green-500 mr-2 h-5 w-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-center text-muted-foreground">
                      <X className="text-red-500 mr-2 h-5 w-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-primary text-primary-foreground rounded-md py-2 font-medium hover:bg-primary/90 transition-colors">
                  Choose Plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        {toast && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-md shadow-lg">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
