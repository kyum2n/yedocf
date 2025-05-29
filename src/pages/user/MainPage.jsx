import DirectionsMap from '@/components/features/directions/DirectionsMap';
import lobbyImg from '@/assets/images/lobby.jpg';
import GoToReservationButton from '@/components/common/GoToReservationButton';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Spacer from '@/components/common/Spacer';

const MainPage = () => {

  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const scrollTarget = params.get("scrollTo");

    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [search]);

  return (
    <div className="relative">
      <div
        className="w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${lobbyImg})` }}
      >
        {/* 나중에 콘텐츠 추가 */}
      </div>
      <Spacer size="lg" />
      <DirectionsMap />
      <Spacer />
      <GoToReservationButton />
    </div>
  );
};

export default MainPage;

