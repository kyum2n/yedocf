import BannerSection from '../components/BannerSection';
import DirectionsMap from '../components/DirectionsMap';
import TabSection from '../components/TabSection';
import TreatmentContent from '../components/TreatmentContent';
import faceBanner from '../assets/images/chin-hor.jpg';
import Spacer from '../components/Spacer';

const tabList = [
  { key: '1', label: '윤곽성형1' },
  { key: '2', label: '윤곽성형2' },
];

const renderFaceContent = (tab) => {
  switch (tab) {
    case '1': return <div>윤곽1 설명</div>;
    case '2': return <div>윤곽2 설명</div>;
    default: return <div>기본 설명</div>;
  }
};

const FacePage = () => (
  <>
    <BannerSection image={faceBanner} title="윤곽 성형" subtitle="자연스럽게 깎아낸 아름다움" objectPosition="object-[50%_30%]"/>
    <div className="relative z-20 bg-white">
    <TabSection tabList={tabList} />
    <TreatmentContent renderContent={renderFaceContent} />
    <Spacer size="lg" />
    <DirectionsMap />
    <Spacer size="lg" />
    </div>
  </>
);

export default FacePage;
