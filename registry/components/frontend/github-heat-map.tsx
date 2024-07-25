import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GitHubHeatMapProps {
  url: string;
  color: string;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const GitHubHeatMap: FC<GitHubHeatMapProps> = ({ url, color }) => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
        setContributions(data.contributions || []);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, [url]);

  const getColor = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-gray-200';
      case 1:
        return `${color}-100`;
      case 2:
        return `${color}-200`;
      case 3:
        return `${color}-300`;
      case 4:
        return `${color}-400`;
      default:
        return 'bg-gray-200';
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!contributions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {contributions.map((day, index) => (
        <motion.div
          key={index}
          className={`w-4 h-4 ${getColor(day.level)}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.02 }}
        />
      ))}
    </div>
  );
};

export default GitHubHeatMap;
