'use client';

import React from 'react';
import GitHubHeatMap from '../../backend/GitHubHeatMap/GitHubHeatMap';
import { EventHandlerMap, Activity } from 'react-activity-calendar';

const GitHubHeatMap1Demo: React.FC = () => {
  const eventHandlers: EventHandlerMap = {
    onClick: (event: React.SyntheticEvent<SVGRectElement>) => (activity: Activity) => {
      console.log('Clicked:', activity);
    },
    onMouseOver: (event: React.SyntheticEvent<SVGRectElement>) => (activity: Activity) => {
      console.log('Mouse Over:', activity);
    },
    onMouseOut: (event: React.SyntheticEvent<SVGRectElement>) => (activity: Activity) => {
      console.log('Mouse Out:', activity);
    },
  };

  const renderBlock = (block: any, activity: any) => (
    <div style={{ backgroundColor: activity.color, width: '100%', height: '100%' }}>
      {activity.count}
    </div>
  );

  const transformData = (data: any[]) => {
    return data.map(item => ({
      ...item,
      count: item.count * 2, // Example transformation
    }));
  };

  return (
    <div className="flex items-center justify-center overflow-x-hidden">
      <GitHubHeatMap
        username="cedzlabs"
        year={2023}
        blockMargin={5}
        blockRadius={3}
        blockSize={15}
        colorScheme="dark"
        errorMessage="Error loading data"
        eventHandlers={eventHandlers}
        fontSize={16}
        hideColorLegend={true}
        hideMonthLabels={false}
        hideTotalCount={false}
        labels={{ months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }}
        loading={false}
        ref={React.createRef<HTMLElement>()}
        renderBlock={renderBlock}
        showWeekdayLabels={true}
        style={{ border: '1px solid #ccc' }}
        theme={{ light: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'], dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'] }}
        throwOnError={true}
        totalCount={100}
        transformData={transformData}
        transformTotalCount={false}
        weekStart={0 as Day}
      />
    </div>
  );
};

export default GitHubHeatMap1Demo;
