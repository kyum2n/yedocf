import BannerSection from '@/components/common/BannerSection';
import DirectionsMap from '@/components/features/directions/DirectionsMap';
import TabSection from '@/components/features/treatment/TabSection';
import TreatmentContent from '@/components/features/treatment/TreatmentContent';
import { eye_hor } from '@/assets/cdnImages';
import Spacer from '@/components/common/Spacer';
import GoToReservationButton from '@/components/common/GoToReservationButton';
import ScrollToTopOnTabChange from '@/components/common/ScrollToTopOnTabChange';

const tabList = [
  { key: '1', label: '쌍커풀' },
  { key: '2', label: '비절개 쌍커풀' },
  { key: '3', label: '앞트임' },
  { key: '4', label: '뒤트임' },
  { key: '5', label: '밑트임' },
  { key: '6', label: '눈매 교정' },
  { key: '7', label: '지방 재배치' },
  { key: '8', label: '다크서클 제거' },
];

const renderEyeContent = (tab) => {
  switch (tab) {
    case '1': return <div>쌍커풀<img src="https://placehold.co/1200x1500/yellow/gray" alt="placeholder" /></div>;
    case '2': return <div>비절개 쌍커풀<img src="https://placehold.co/1200x1500/yellow/gray" alt="placeholder" /></div>;
    case '3': return <div>앞트임<img src="https://placehold.co/1200x1500/yellow/gray" alt="placeholder" /></div>;
    case '4': return <div>뒤트임<img src="https://placehold.co/1200x1500/yellow/gray" alt="placeholder" /></div>;
    case '5': return <div>밑트임<img src="https://placehold.co/1200x1500/yellow/gray" alt="placeholder" /></div>;
    case '6': return <div>눈매 교정<img src="https://placehold.co/1200x1500/yellow/gray" alt="placeholder" /></div>;
    case '7': return <div>지방 재배치<img src="https://placehold.co/1200x1500/yellow/gray" alt="placeholder" /></div>;
    case '8': return <div>다크서클 제거<img src="https://placehold.co/1200x1500/yellow/gray" alt="placeholder" /></div>;
    default: return <div>기본<img src="https://placehold.co/1200x1500/yellow/gray" alt="placeholder" /></div>;
  }
};

const EyePage = () => (
  <>
    <BannerSection image={eye_hor} title="눈 성형" subtitle="맑고 또렷한 눈" />
    <div className="relative z-20 bg-white">
      <ScrollToTopOnTabChange />
      <TabSection tabList={tabList} />
      <TreatmentContent renderContent={renderEyeContent} />
      <Spacer size="lg" />
      <DirectionsMap />
      <Spacer size="lg" />
      <GoToReservationButton />
    </div>
  </>
);

export default EyePage;
