import { FC } from "react";
import GitHubHeatMap from "../frontend/github-heat-map";

const GitHubHeatMapDemo: FC = () => (
  <div className="p-4">
    <GitHubHeatMap url="https://api.github.com/user/yakkshit/contributions" color="bg-green" />
  </div>
);

export default GitHubHeatMapDemo;
