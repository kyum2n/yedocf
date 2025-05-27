import BannerSection from '../components/BannerSection';
import DirectionsMap from '../components/DirectionsMap';
import TabSection from '../components/TabSection';
import TreatmentContent from '../components/TreatmentContent';
import eyeBanner from '../assets/images/eye-hor.jpg';
import Spacer from '../components/Spacer';

const tabList = [
  { key: '1', label: '눈성형1' },
  { key: '2', label: '눈성형2' },
  { key: '3', label: '눈성형3' },
  { key: '4', label: '눈성형4' },
  { key: '5', label: '눈성형5' },
  { key: '6', label: '눈성형6' },
  { key: '7', label: '눈성형7' },
  { key: '8', label: '눈성형8' },
];

const renderEyeContent = (tab) => {
  switch (tab) {
    case '1': return <div>눈1 설명</div>;
    case '2': return <div>눈2 설명</div>;
    case '3': return <div>눈3 설명</div>;
    case '4': return <div>눈4 설명</div>;
    case '5': return <div>눈5 설명</div>;
    case '6': return <div>눈6 설명</div>;
    case '7': return <div>눈7 설명</div>;
    case '8': return <div>눈8 설명</div>;
    default: return <div>기본 설명</div>;
  }
};

const EyePage = () => (
  <>
    <BannerSection image={ eyeBanner } title="눈 성형" subtitle="맑고 또렷한 눈" />
    <div className="relative z-20 bg-white">
    <TabSection tabList={tabList} />
    <TreatmentContent renderContent={renderEyeContent} />
    <Spacer size="lg" />
    <DirectionsMap/>
    <Spacer size="lg" />
    </div>
  </>
);

export default EyePage;
