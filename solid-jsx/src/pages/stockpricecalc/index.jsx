import { createSignal, createMemo, createEffect, onMount } from 'solid-js';
import { styled } from 'solid-styled-components';
import { createStore } from 'solid-js/store';

const Base = styled('div')`
  color: #fff;
  width: 100%;
  height: auto;
`;

const Form = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin-left: 20px;
  margin-bottom: 80px;
`;

const InputGroup = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: flex-start;
`;

const Title = styled('h1')`
  color: #fff;
  margin-bottom: 25px;
  font-size: 1.8rem;
  text-align: left;
`;

const Label = styled('label')`
  font-weight: bold;
  color: #eee;
  font-size: 0.95rem;
  width: 100%;
  text-align: left;
  margin-left: 5px;
`;

const Input = styled('input')`
  width: 200px;
  padding: 10px;
  border: 1px solid #444;
  background: #333;
  color: white;
  border-radius: 5px;
  font-size: 1rem;
  margin-left: 5px;

  &[type="range"] {
    width: 100%;
    height: 8px;
    background: #555;
    border-radius: 5px;
    outline: none;
    margin-left: 0;
    padding: 0;
  }
`;

const InputWrapper = styled('div')`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  width: 100%;
`;

const InfoBox = styled('div')`
  padding: 12px;
  background: #2a2a2a;
  border-radius: 6px;
  line-height: 1.6;
  margin-top: 8px;
  width: 100%;
  text-align: left;
`;

const Highlight = styled('span')`
  background-color: #ffeb3b;
  color: #000;
  padding: 2px 6px;
  border-radius: 3px;
  margin: 0 3px;
  font-weight: 600;
`;


const StockPriceCalc = () => {
  // 일반 상태는 createSignal로 유지
  const [commission, setCommission] = createSignal(0.23);
  const [purchasePrice, setPurchasePrice] = createSignal(0);
  const [currentShares, setCurrentShares] = createSignal(0);
  const [currentPrice, setCurrentPrice] = createSignal(0);
  const [targetPrice, setTargetPrice] = createSignal(0);
  const [scrollValue, setScrollValue] = createSignal(0);
  
  // 복잡한 상태는 store로 관리
  const [holdings, setHoldings] = createStore([]);
  
  // 마지막 추가된 항목의 참조를 저장할 변수
  let latestHoldingRef;
  
  const plannedPurchaseShares = createMemo(() => scrollValue());
  const additionalPurchaseAmount = createMemo(() => scrollValue() * currentPrice());

  const handleCommissionChange = (e) => setCommission(parseFloat(e.target.value) || 0);
  const handlePurchasePriceChange = (e) => setPurchasePrice(parseFloat(e.target.value) || 0);
  const handleCurrentSharesChange = (e) => setCurrentShares(parseFloat(e.target.value) || 0);
  const handleCurrentPriceChange = (e) => setCurrentPrice(parseFloat(e.target.value) || 0);
  const handleScrollValueChange = (e) => setScrollValue(parseFloat(e.target.value) || 0);
  const handleTargetPriceChange = (e) => setTargetPrice(parseFloat(e.target.value) || 0);

  // 보유 정보 입력 필드 추가 핸들러
  const addHolding = () => {
    const newIndex = holdings.length;
    setHoldings([...holdings, { price: 0, shares: 0 }]);
    
    // 새 항목이 추가된 후 스크롤 위치 조정
    setTimeout(() => {
      if (latestHoldingRef) {
        // window.scrollTo를 사용하여 전체 페이지 스크롤
        const rect = latestHoldingRef.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        window.scrollTo({
          top: rect.top + scrollTop - 100, // 약간 위에 위치하도록 조정
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // 보유 정보 변경 핸들러
  const handleHoldingChange = (index, field, e) => {
    const value = parseFloat(e.target.value) || 0;
    setHoldings(index, field, value);
  };

  // 전체 보유 주식 및 투자금액 계산
  const calculateTotalHoldings = () => {
    const baseHolding = {
      price: purchasePrice(),
      shares: currentShares()
    };
    
    const allHoldings = [baseHolding, ...holdings];
    
    let totalShares = 0;
    let totalInvestment = 0;
    
    allHoldings.forEach(holding => {
      totalShares += holding.shares;
      totalInvestment += holding.price * holding.shares;
    });
    
    const averagePrice = totalShares > 0 ? totalInvestment / totalShares : 0;
    
    return {
      totalShares,
      totalInvestment,
      averagePrice
    };
  };

  const calculateResults = () => {
    const totalHoldings = calculateTotalHoldings();
    const totalShares = totalHoldings.totalShares + plannedPurchaseShares();
    const totalCost = totalHoldings.totalInvestment 
      + additionalPurchaseAmount() 
      + commission();
    const adjustedAveragePrice = totalShares > 0 ? totalCost / totalShares : 0;
    
    return { 
      adjustedAveragePrice: adjustedAveragePrice || 0
    };
  };

  // 목표가 도달 시 예상 수익 계산
  const calculateTargetResults = () => {
    const totalHoldings = calculateTotalHoldings();
    const totalShares = totalHoldings.totalShares;
    const targetAmount = totalShares * targetPrice();
    const commissionFee = targetAmount * (commission() / 100);
    const netAmount = targetAmount - commissionFee;
    const profit = netAmount - totalHoldings.totalInvestment;
    const profitRate = (profit / totalHoldings.totalInvestment) * 100;

    return {
      totalShares,
      targetAmount,
      commissionFee,
      netAmount,
      profit,
      profitRate
    };
  };

  return (
    <Base>
      <Title>📈 주식 평단가 계산기</Title>
      <Form>
        <InputGroup>
          <Label>거래 수수료 (%)</Label>
          <InputWrapper>
            <Input
              type="number"
              value={commission()}
              onInput={handleCommissionChange}
              step="0.01"
              placeholder="0.23%"
            />
          </InputWrapper>
        </InputGroup>

        <InputGroup>
          <Label>현재 보유 정보(평단가, 주식수)</Label>
          <InputWrapper>
            <Input
              type="number"
              value={purchasePrice()}
              onInput={handlePurchasePriceChange}
              placeholder="평균 매입가"
            />
            <Input
              type="number"
              value={currentShares()}
              onInput={handleCurrentSharesChange}
              placeholder="보유 주식 수"
            />
            {/* 추가 항목이 없을 때만 첫 번째 추가 버튼 표시 */}
            {holdings.length === 0 && (
              <button 
                onClick={addHolding}
                style={{
                  padding: '10px 15px',
                  background: '#444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                추가
              </button>
            )}
          </InputWrapper>
        </InputGroup>

        {/* 추가 보유 정보 입력 필드들 */}
        {holdings.map((holding, index) => (
          <InputGroup 
            key={`holding-${index}`}
            ref={el => {
              // 마지막 항목의 참조 저장
              if (index === holdings.length - 1) {
                latestHoldingRef = el;
              }
            }}
          >
            <Label>추가 보유 정보 #{index + 1}</Label>
            <InputWrapper>
              <Input
                type="number"
                value={holding.price}
                onInput={(e) => handleHoldingChange(index, 'price', e)}
                placeholder="평균 매입가"
                id={`price-${index}`}
              />
              <Input
                type="number"
                value={holding.shares}
                onInput={(e) => handleHoldingChange(index, 'shares', e)}
                placeholder="보유 주식 수"
                id={`shares-${index}`}
              />
              {/* 마지막 항목에만 추가 버튼 표시 */}
              {index === holdings.length - 1 && (
                <button 
                  onClick={addHolding}
                  style={{
                    padding: '10px 15px',
                    background: '#444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  추가
                </button>
              )}
            </InputWrapper>
          </InputGroup>
        ))}

        {/* 합산된 보유 정보 표시 */}
        {holdings.length > 0 && (
          <InfoBox>
            <div>
              총 보유 주식수: <Highlight>{calculateTotalHoldings().totalShares}</Highlight>주
            </div>
            <div>
              평균 매입가: <Highlight>{calculateTotalHoldings().averagePrice.toFixed(0)}</Highlight>원
            </div>
            <div>
              총 투자금액: <Highlight>{calculateTotalHoldings().totalInvestment.toFixed(0)}</Highlight>원
            </div>
          </InfoBox>
        )}

        {/* 목표가 입력 필드 추가 */}
        <InputGroup>
          <Label>목표가</Label>
          <InputWrapper>
            <Input
              type="number"
              value={targetPrice()}
              onInput={handleTargetPriceChange}
              placeholder="목표 매도가"
            />
          </InputWrapper>
          
          {/* 목표가 기준 예상 수익 정보 */}
          {targetPrice() > 0 && calculateTotalHoldings().totalShares > 0 && (
            <InfoBox>
              <div>
                예상 매도 금액: <Highlight>{calculateTargetResults().targetAmount.toFixed(0)}</Highlight>원
              </div>
              <div>
                거래 수수료: <Highlight>{calculateTargetResults().commissionFee.toFixed(0)}</Highlight>원
              </div>
              <div>
                실수령액: <Highlight>{calculateTargetResults().netAmount.toFixed(0)}</Highlight>원
              </div>
              <div>
                예상 수익: <Highlight style={{ 
                  backgroundColor: calculateTargetResults().profit > 0 ? '#4CAF50' : '#f44336',
                  color: '#000',
                  fontWeight: '600'
                }}>
                  {calculateTargetResults().profit.toFixed(0)}
                </Highlight>원
                (<Highlight style={{
                  backgroundColor: calculateTargetResults().profit > 0 ? '#4CAF50' : '#f44336',
                  color: '#000',
                  fontWeight: '600'
                }}>
                  {calculateTargetResults().profitRate.toFixed(2)}
                </Highlight>%)
              </div>
            </InfoBox>
          )}
        </InputGroup>

        <InputGroup>
          <Label>현재 주가</Label>
          <InputWrapper>
            <Input
              type="number"
              value={currentPrice()}
              onInput={handleCurrentPriceChange}
              placeholder="현재 주가"
            />
          </InputWrapper>
        </InputGroup>

        <InputGroup>
          <Label>추가 매수 설정</Label>
          <InputWrapper>
            <Input
              type="number"
              value={scrollValue().toFixed(0)}
              onInput={handleScrollValueChange}
              placeholder="매수할 주식 수"
            />
            <Input
              type="range"
              min="0"
              max="10000"
              value={scrollValue()}
              onInput={handleScrollValueChange}
            />
          </InputWrapper>
          
          <InfoBox>
            <Highlight>{scrollValue()}</Highlight>주 추가 매수 시 → 
            총 보유 주식수: <Highlight>{calculateTotalHoldings().totalShares + Number(scrollValue())}</Highlight>주, 
            조정 평단가: <Highlight>{calculateResults().adjustedAveragePrice.toFixed(0)}</Highlight>원
            <div>
              <br/>
              <Highlight>{currentPrice()}</Highlight>원에 <Highlight>{scrollValue()}</Highlight>주를 
              추가 매수 하려면 <Highlight>{additionalPurchaseAmount().toFixed(0)}</Highlight>원이 필요합니다.
            </div>
          </InfoBox>
        </InputGroup>
      </Form>
    </Base>
  );
};

export default StockPriceCalc;
