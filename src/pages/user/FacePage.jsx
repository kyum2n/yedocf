import BannerSection from '@/components/common/BannerSection';
import DirectionsMap from '@/components/features/directions/DirectionsMap';
import TabSection from '@/components/features/treatment/TabSection';
import TreatmentContent from '@/components/features/treatment/TreatmentContent';
import { faceBanner } from '@/assets/images';
import Spacer from '@/components/common/Spacer';
import GoToReservationButton from '@/components/common/GoToReservationButton';
import ScrollToTopOnTabChange from '@/components/common/ScrollToTopOnTabChange';

const tabList = [
  { key: '1', label: '광대축소술' },
  { key: '2', label: '사각턱 수술' },
  { key: '3', label: 'V라인 턱끝 성형' },
  { key: '4', label: '양악수술' },
  { key: '5', label: '이중턱 지방흡입' },
];

const renderFaceContent = (tab) => {
  switch (tab) {
    case '1': return <div>광대축소술<img src="https://placehold.co/1200x1500/green/gray" alt="placeholder" /></div>;
    case '2': return <div>사각턱 수술<img src="https://placehold.co/1200x1500/green/gray" alt="placeholder" /></div>;
    case '3': return <div>V라인 턱끝 성형<img src="https://placehold.co/1200x1500/green/gray" alt="placeholder" /></div>;
    case '4': return <div>양악수술<img src="https://placehold.co/1200x1500/green/gray" alt="placeholder" /></div>;
    case '5': return <div>이중턱 지방흡입<img src="https://placehold.co/1200x1500/green/gray" alt="placeholder" /></div>;
    default: return <div>기본 <img src="https://placehold.co/1200x1500/green/gray" alt="placeholder" /></div>;
  }
};

const FacePage = () => (
  <>
    <BannerSection image={faceBanner} title="윤곽 성형" subtitle="자연스럽게 깎아낸 아름다움" objectPosition="object-[50%_30%]" />
    <div className="relative z-20 bg-white">
      <ScrollToTopOnTabChange />
      <TabSection tabList={tabList} />
      <TreatmentContent renderContent={renderFaceContent} />
      <Spacer size="lg" />
      <DirectionsMap />
      <Spacer size="lg" />
      <GoToReservationButton />
    </div>
  </>
);

export default FacePage;
