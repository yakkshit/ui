import { FC } from 'react';
import { TextScroll, TextZoomImage } from '../frontend/text';

const TextDemo: FC = () => (
  <div className="p-4 space-y-8">
    <TextScroll text="This is a scrolling text effect" speed={30} className="text-red-500" />
    <TextZoomImage imageUrl="https://static.wixstatic.com/media/500437_c3b2fe4000614133981ed8ca03e94efb~mv2.jpg/v1/fill/w_700,h_526,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/500437_c3b2fe4000614133981ed8ca03e94efb~mv2.jpg" text="Hover to Zoom" className="text-yellow-500" imageClassName="rounded-lg" />
  </div>
);

export default TextDemo;
