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
    case '1': return <div className='h-[1500px] w-[1200px] bg-pink-50 text-center font-bold'>쌍커풀</div>;
    case '2': return <div className='h-[1500px] w-[1200px] bg-pink-100 text-center font-bold'>비절개 쌍커풀</div>;
    case '3': return <div className='h-[1500px] w-[1200px] bg-pink-200 text-center font-bold'>앞트임</div>;
    case '4': return <div className='h-[1500px] w-[1200px] bg-pink-300 text-center font-bold'>뒤트임</div>;
    case '5': return <div className='h-[1500px] w-[1200px] bg-pink-400 text-center font-bold'>밑트임</div>;
    case '6': return <div className='h-[1500px] w-[1200px] bg-pink-500 text-center font-bold'>눈매 교정</div>;
    case '7': return <div className='h-[1500px] w-[1200px] bg-pink-600 text-center font-bold'>지방 재배치</div>;
    case '8': return <div className='h-[1500px] w-[1200px] bg-pink-700 text-center font-bold'>다크서클 제거</div>;
    default: return <div className='h-[1500px] w-[1200px] bg-pink-100 text-center font-bold'>기본</div>;
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
