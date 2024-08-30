'use client';
import React, { useEffect, useState } from 'react';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import GitHubCalendar from 'react-github-calendar';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { EventHandlerMap } from 'react-activity-calendar';
import { Day } from 'date-fns';

// Inject the styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
document.head.appendChild(styleSheet);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GitHubHeatMapProps {
  username: string;
  year?: number | 'last';
  blockMargin?: number;
  blockRadius?: number;
  blockSize?: number;
  colorScheme?: 'light' | 'dark';
  errorMessage?: string;
  eventHandlers?: EventHandlerMap;
  fontSize?: number;
  hideColorLegend?: boolean;
  hideMonthLabels?: boolean;
  hideTotalCount?: boolean;
  labels?: any;
  loading?: boolean;
  ref?: React.RefObject<HTMLElement>;
  renderBlock?: (block: any, activity: any) => React.ReactElement;
  showWeekdayLabels?: boolean;
  style?: React.CSSProperties;
  theme?: any;
  throwOnError?: boolean;
  totalCount?: number;
  transformData?: (data: any[]) => any[];
  transformTotalCount?: boolean;
  weekStart?: Day;
}

const GitHubHeatMap: React.FC<GitHubHeatMapProps> = ({
  username,
  year = 'last',
  blockMargin = 4,
  blockRadius = 2,
  blockSize = 12,
  colorScheme,
  errorMessage,
  eventHandlers,
  fontSize = 14,
  hideColorLegend = false,
  hideMonthLabels = false,
  hideTotalCount = false,
  labels,
  loading = false,
  ref,
  renderBlock,
  showWeekdayLabels = false,
  style,
  theme,
  throwOnError = false,
  totalCount,
  transformData,
  transformTotalCount = true,
  weekStart = 0 as Day,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/events`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className={cn("p-4", "rounded-lg", "shadow-md")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={style}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className={cn("text-xl", "font-bold", "text-gray-900", "dark:text-gray-100")}>
          GitHub Activity
        </h2>
        <Github name="github" size={24} className={cn("text-gray-900", "dark:text-gray-100")} />
      </div>
      <div className="overflow-x-auto">
        <GitHubCalendar
          username={username}
          year={year}
          blockMargin={blockMargin}
          blockRadius={blockRadius}
          blockSize={blockSize}
          colorScheme={colorScheme}
          errorMessage={errorMessage}
          eventHandlers={eventHandlers}
          fontSize={fontSize}
          hideColorLegend={hideColorLegend}
          hideMonthLabels={hideMonthLabels}
          hideTotalCount={hideTotalCount}
          labels={labels}
          loading={loading}
          ref={ref}
          renderBlock={renderBlock}
          showWeekdayLabels={showWeekdayLabels}
          theme={theme}
          throwOnError={throwOnError}
          totalCount={totalCount}
          transformData={transformData}
          transformTotalCount={transformTotalCount}
          weekStart={weekStart}
        />
      </div>
    </motion.div>
  );
};

export default GitHubHeatMap;
