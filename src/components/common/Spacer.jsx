const Spacer = ({ size = 'md' }) => {
  const sizeMap = {
    sm: 'h-4',   // 1rem
    md: 'h-8',   // 2rem
    lg: 'h-16',  // 4rem
    xl: 'h-24',  // 6rem
  };

  return <div className={sizeMap[size] || sizeMap.md} />;
};

export default Spacer;
// 반응형 디자인을 고려하여 다양한 크기의 여백을 제공하는 Spacer 컴포넌트입니다.
// size prop을 통해 여백의 크기를 조절할 수 있으며, 기본값은 'md'입니다.
// sm, md, lg, xl 크기를 지원하며, 각 크기는 Tailwind CSS의 유틸리티 클래스를 사용하여 정의됩니다.
// 이 컴포넌트는 페이지 레이아웃에서 요소 간의 간격을 조절하는 데 유용합니다.
// 사용 예시:
// <Spacer size="lg" />