import { useSearchParams } from 'react-router-dom'
import Spacer from '@/components/common/Spacer';

const TabSection = ({ tabList }) => {
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') || tabList[0]?.key;

  return (
    <>
      <ul className="bg-white flex justify-center gap-4 border-b sticky z-10 top-16 shadow">
        {tabList.map(({ key, label }) => (
          <li key={key}>
            <button
              onClick={() => setParams({ tab: key })}
              className={`h-12 p-4 flex-center hover:bg-gray-100 
              ${tab === key ? 'font-bold border-b-2 border-black' : ''
                }`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
      <Spacer size="md" />
      {/* 여백 삽입 */}
    </>
  );
};

export default TabSection;
// 이 컴포넌트는 시술 페이지의 탭 메뉴를 표시합니다.
// useSearchParams 훅을 사용하여 URL의 쿼리 파라미터를 관리합니다.
// tabList는 탭의 목록을 받아 각 탭에 대한 버튼을 생성합니다.
// 현재 선택된 탭은 URL의 'tab' 파라미터로 관리되며, 기본값은 첫 번째 탭으로 설정됩니다.
// 각 탭 버튼은 클릭 시 해당 탭으로 변경되며, 선택된 탭은 강조 표시됩니다.
// 탭 버튼은 flexbox를 사용하여 가로로 정렬되며, 선택된 탭은 두꺼운 글씨와 밑줄로 표시됩니다.
// 이 컴포넌트는 시술 페이지의 상단에 위치하여 사용자가 원하는 시술 정보를 쉽게 찾을 수 있도록 도와줍니다.