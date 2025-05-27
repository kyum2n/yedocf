// index.js
import eyeBanner from './eye-hor.jpg';
import noseBanner from './nose-hor.jpg';
import faceBanner from './chin-hor.jpg';

import eyecontent from './eye-ver.jpg';
import nosecontent from './nose-ver.jpg';
import facecontent from './chin-ver.jpg';

export {
  eyeBanner,
  noseBanner,
  faceBanner,
  eyecontent,
  nosecontent,
  facecontent
};
// 이미지를 불러와서 객체로 내보냅니다.
// 이 객체는 다른 파일에서 import하여 사용할 수 있습니다.
// 예: import { eyeBanner } from './assets/images';
// 이 파일은 이미지 파일들을 모듈화하여 관리하기 위한 용도로 사용됩니다.