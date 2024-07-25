import { FC } from "react";
import Slider from "../frontend/slider";

const images = [
  'logo.png',
  'https://pin.it/28puUmGM1',
  'https://pin.it/28puUmGM1',
];

const SliderDemo: FC = () => (
  <div className="p-4">
    <Slider images={images} />
  </div>
);

export default SliderDemo;
