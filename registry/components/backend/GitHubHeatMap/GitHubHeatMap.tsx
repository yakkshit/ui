// components/GitHubHeatMap.tsx
'use client';

import React from 'react';
import GitHubCalendar from 'react-github-calendar';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react'; // Ensure this is correct
import { EventHandlerMap } from 'react-activity-calendar';
import Day from "react-activity-calendar";

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
  weekStart = 0 as Day, // Ensure this is a valid Day value
}) => {
  return (
    <motion.div
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={style}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          GitHub Activity
        </h2>
        <Github name="github" size={24} className="text-gray-900 dark:text-gray-100" />
      </div>
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
    </motion.div>
  );
};

export default GitHubHeatMap;
