import { useNavigate } from '@solidjs/router';

function Home() {
  const navigate = useNavigate();

  // 베팅 테스트 버튼 클릭 이벤트 처리 함수
  const handleBettingTestClick = () => {
    navigate('/testbet');
  };

  return (
    <div class="App">
      <header class="App-header">
        <div>
          <button onClick={handleBettingTestClick}>베팅 테스트</button>
          <button onClick={handleRebalancingCalcClick}>리밸런싱 계산</button>
        </div>
      </header>
    </div>
  );
}

export default Home;
