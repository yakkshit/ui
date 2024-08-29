"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Price2Demo() {
  const [currency, setCurrency] = useState<"USD" | "EUR" | "GBP">("EUR");
  const [rates, setRates] = useState<{ [key: string]: number }>({
    USD: 1.1, // Default values if API fails
    EUR: 1,
    GBP: 0.9,
  });

  const currencySymbols: { [key: string]: string } = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const currencyOptions = [
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
    { label: "GBP", value: "GBP" },
  ];

  const pricingPlans = [
    {
      title: "Basic",
      description: "Perfect for individuals and small teams.",
      features: ["Up to 5 users", "1 GB storage", "Basic analytics", "24/7 support"],
      prices: { USD: 9, EUR: 9, GBP: 8 },
    },
    {
      title: "Pro",
      description: "Ideal for growing businesses and teams.",
      features: ["Up to 25 users", "10 GB storage", "Advanced analytics", "Priority support"],
      prices: { USD: 29, EUR: 27, GBP: 24 },
    },
    {
      title: "Enterprise",
      description: "Tailored for large organizations and enterprises.",
      features: ["Unlimited users", "100 GB storage", "Enterprise-grade analytics", "Dedicated support"],
      prices: { USD: 99, EUR: 89, GBP: 79 },
    },
  ];

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        const accessKey = process.env.NEXT_PUBLIC_FIXER_API_KEY;
        const symbols = "USD,EUR,GBP";
        const fixerUrl = `http://data.fixer.io/api/latest?access_key=${accessKey}&symbols=${symbols}`;

        const response = await fetch(fixerUrl);
        if (!response.ok) {
          throw new Error(`FIXER API error: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.rates) {
          setRates(data.rates);
        } else {
          console.error("Rates not found in API response");
        }
      } catch (error) {
        console.error("Error fetching data from FIXER API:", error);
        // Ensure that the rates state remains as the default rates if API fails
      }
    };

    fetchCurrencyRates();
  }, []);

  // Function to get the price in the selected currency
  const getPriceInCurrency = (price: number, baseCurrency: string) => {
    const baseRate = rates[baseCurrency];
    const currentRate = rates[currency];
    if (baseRate && currentRate) {
      return (price * currentRate / baseRate).toFixed(2);
    }
    return price.toFixed(2);
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pricing Plans</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that fits your needs and budget.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {currencyOptions.map((option) => (
              <Button
                key={option.value}
                variant={currency === option.value ? "default" : "outline"}
                onClick={() => setCurrency(option.value as "USD" | "EUR" | "GBP")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currency === option.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div key={plan.title} className="flex flex-col items-start rounded-lg bg-background p-6 shadow-md transition-all hover:scale-105 hover:border-2 hover:border-black dark:border-lime-400">
              <div className="mb-4 flex w-full items-center justify-between">
                <h3 className="text-2xl font-bold">{plan.title}</h3>
                <div className="text-4xl font-bold">
                {currencySymbols[currency]}{getPriceInCurrency(plan.prices["EUR"], "EUR")}
                </div>
              </div>
              <p className="mb-6 text-muted-foreground">{plan.description}</p>
              <ul className="mb-8 flex flex-col gap-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                    <CheckIcon className="h-5 w-5 even:x-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant="default"
                className="mt-auto w-full rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
