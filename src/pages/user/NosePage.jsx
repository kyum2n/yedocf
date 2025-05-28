import BannerSection from '@/components/common/BannerSection';
import DirectionsMap from '@/components/features/directions/DirectionsMap';
import TabSection from '@/components/features/treatment/TabSection';
import TreatmentContent from '@/components/features/treatment/TreatmentContent';
import { noseBanner } from '@/assets/images';
import Spacer from '@/components/common/Spacer';

const tabList = [
  { key: '1', label: '콧대 성형' },
  { key: '2', label: '매부리코 성형' },
  { key: '3', label: '복코 교정' },
  { key: '4', label: '코끝 성형' },
  { key: '5', label: '콧볼 축소' },
];

const renderNoseContent = (tab) => {
  switch (tab) {
    case '1': return <div>콧대 성형<img src="https://placehold.co/1200x1500/blue/gray" alt="placeholder" /></div>;
    case '2': return <div>매부리코 성형<img src="https://placehold.co/1200x1500/blue/gray" alt="placeholder" /></div>;
    case '3': return <div>복코 교정<img src="https://placehold.co/1200x1500/blue/gray" alt="placeholder" /></div>;
    case '4': return <div>코끝 성형<img src="https://placehold.co/1200x1500/blue/gray" alt="placeholder" /></div>;
    case '5': return <div>콧볼 축소<img src="https://placehold.co/1200x1500/blue/gray" alt="placeholder" /></div>;
    default: return <div>기본 <img src="https://placehold.co/1200x1500/blue/gray" alt="placeholder" /></div>;
  }
};

const NosePage = () => (
  <>
    <BannerSection image={noseBanner} title="코 성형" subtitle="오롯하게 세우는 자신감"/>
    <div className="relative z-20 bg-white">
    <TabSection tabList={tabList} />
    <TreatmentContent renderContent={renderNoseContent} />
    <Spacer size="lg" />
    <DirectionsMap/>
    <Spacer size="lg" />
    </div>
  </>
);

export default NosePage;
