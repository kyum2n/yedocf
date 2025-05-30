import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DirectionsMap from '@/components/features/directions/DirectionsMap';
import GoToReservationButton from '@/components/common/GoToReservationButton';
import lobbyImg from '@/assets/images/lobby.jpg';
import Footer from '@/components/layout/Footer';
import Spacer from '@/components/common/Spacer';
import FadeTabs from '@/components/common/FadeTabs';

const MainPage = () => {
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const scrollTarget = params.get("scrollTo");
    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [search]);
  const tabData = [
  { label: '탭 1', content: <p>첫 번째 탭입니다</p> },
  { label: '탭 2', content: <div>두 번째 탭입니다</div> },
  ];

  return (
    <>
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        {/* Hero Section */}
        <section
          id="hero"
          className="h-screen snap-start bg-cover bg-center flex items-center justify-center relative"
          style={{ backgroundImage: `url(${lobbyImg})` }}
        >
          <div className="absolute bottom-[15%] flex flex-col items-center text-center gap-4">
            <p className="text-white text-lg font-[SeoulHangangM] text-shadow-lg">
              Beauty & Technology
            </p>
            <p className="text-white text-6xl font-[SeoulHangangM] text-shadow-lg">
              연세 BT 미래병원
            </p>
            <p className="text-white text-2xl font-[SeoulHangangM] text-shadow-lg">
              당신의 아름다움을 미래로 연결합니다.
            </p>
          </div>
          <div className="absolute bottom-[5%] flex flex-col items-center text-center gap-1 animate-bounce text-white">
            <p>Scroll Down</p>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-4-4m4 4l4-4" />
            </svg>
          </div>
        </section>

        {/* Directions Section */}

        <section className="h-screen snap-start bg-cover bg-center flex items-center justify-center relative">
          <FadeTabs
            tabs={tabData}
            tabPosition="top"
            renderTab={(label, isActive) => (
              <button
                className={`px-4 py-2 font-bold border-b-2 transition-opacity ${isActive ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'
                  }`}
              >
                {label}
              </button>
            )}
            renderContent={(content) => (
              <div className="text-center text-lg py-6 text-gray-700">{content}</div>
            )}
          />
        </section>
        <DirectionsMap />
        <Spacer size='lg' />
        <Footer />
      </div>
      <GoToReservationButton />
    </>
  );
};

export default MainPage;