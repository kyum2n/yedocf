import BannerSection from '../components/BannerSection';
import DirectionsMap from '../components/DirectionsMap';
import TabSection from '../components/TabSection';
import TreatmentContent from '../components/TreatmentContent';
import noseBanner from '../assets/images/nose-hor.jpg';
import Spacer from '../components/Spacer';

const tabList = [
  { key: '1', label: '코성형1' },
  { key: '2', label: '코성형2' },
];

const renderNoseContent = (tab) => {
  switch (tab) {
    case '1': return <div>코1 설명</div>;
    case '2': return <div>코2 설명</div>;
    default: return <div>기본 설명</div>;
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
