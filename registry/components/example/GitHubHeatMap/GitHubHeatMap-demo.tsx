// pages/index.tsx
'use client'

import React from 'react';
import GitHubHeatMap from '../../backend/GitHubHeatMap/GitHubHeatMap';

const GitHubHeatMapDemo: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <GitHubHeatMap username="yakkshit" />
    </div>
  );
};

export default GitHubHeatMapDemo;

