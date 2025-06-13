import BannerSection from '@/components/common/BannerSection';
import DirectionsMap from '@/components/features/directions/DirectionsMap';
import TabSection from '@/components/features/treatment/TabSection';
import TreatmentContent from '@/components/features/treatment/TreatmentContent';
import { nose_hor } from '@/assets/cdnImages';
import Spacer from '@/components/common/Spacer';
import GoToReservationButton from '@/components/common/GoToReservationButton';
import ScrollToTopOnTabChange from '@/components/common/ScrollToTopOnTabChange';

const tabList = [
  { key: '1', label: '콧대 성형' },
  { key: '2', label: '매부리코 성형' },
  { key: '3', label: '복코 교정' },
  { key: '4', label: '코끝 성형' },
  { key: '5', label: '콧볼 축소' },
];

const renderNoseContent = (tab) => {
  switch (tab) {
    case '1': return <div className='h-[1500px] w-[1200px] bg-red-100 text-center font-bold'>콧대 성형</div>;
    case '2': return <div className='h-[1500px] w-[1200px] bg-red-100 text-center font-bold'>매부리코 성형</div>;
    case '3': return <div className='h-[1500px] w-[1200px] bg-red-100 text-center font-bold'>복코 교정</div>;
    case '4': return <div className='h-[1500px] w-[1200px] bg-red-100 text-center font-bold'>코끝 성형</div>;
    case '5': return <div className='h-[1500px] w-[1200px] bg-red-100 text-center font-bold'>콧볼 축소</div>;
    default: return <div className='h-[1500px] w-[1200px] bg-red-100 text-center font-bold'>기본 </div>;
  }
};

const NosePage = () => (
  <>
    <BannerSection image={nose_hor} title="코 성형" subtitle="오롯하게 세우는 자신감" />
    <div className="relative z-20 bg-white">
      <ScrollToTopOnTabChange />
      <TabSection tabList={tabList} />
      <TreatmentContent renderContent={renderNoseContent} />
      <Spacer size="lg" />
      <DirectionsMap />
      <Spacer size="lg" />
      <GoToReservationButton />
    </div>
  </>
);

export default NosePage;
