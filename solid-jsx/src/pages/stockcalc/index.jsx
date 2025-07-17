import { createSignal, createEffect } from 'solid-js';
import { styled } from 'solid-styled-components';

import StockPriceCalc from '../stockpricecalc'

const Base = styled('div')`
  position: fixed;
  top: 5vh;
  left: 0;
  width: 100%;
  height: 95vh;
  padding: 20px 40px;
  background-color: rgba(0, 0, 0, 0.85);
  color: #fff;
  overflow-y: auto;
`;

const Form = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin-left: 20px;
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
  width: 100px;
  text-align: left;
  margin-left: 5px;
`;

const Input = styled('input')`
  width: ${props => props.width || '200px'};
  padding: 10px;
  border: 1px solid #444;
  background: #333;
  color: white;
  border-radius: 5px;
  font-size: 1rem;
  margin-left: 5px;
`;

const ResultBox = styled('div')`
  padding: 15px;
  background: #1e1e1e;
  border-radius: 8px;
  margin-top: 20px;
  font-size: 1.1rem;
  text-align: left;
  
  p {
    margin: 10px 0;
  }
`;

const Highlight = styled('span')`
  background-color: #ffeb3b;
  color: #000;
  padding: 2px 6px;
  border-radius: 3px;
  margin: 0 3px;
  font-weight: 600;
`;

const AlertHighlight = styled(Highlight)`
  background-color: #ff6b6b;
`;

function StockCalc() {
  const [inputValue, setInputValue] = createSignal('');
  const [results, setResults] = createSignal({ val1: 0, val2: 0, val3: 0 });
  const [highPrice, setHighPrice] = createSignal('');
  const [lowPrice, setLowPrice] = createSignal('');
  const [stockResults, setStockResults] = createSignal({ val1: 0, val2: 0, val3: 0 });

  // 2023년 개정 호가단위 계산
  const getHogaUnit = (price) => {
      if (price < 2000) return 1;
      if (price < 5000) return 5;
      if (price < 20000) return 10;
      if (price < 50000) return 50;
      if (price < 200000) return 100;
      if (price < 500000) return 500;
      return 1000;
  };

  // 호가단위 기준 반올림
  const roundToHoga = (value) => {
      const unit = getHogaUnit(value);
      return Math.floor(value / unit) * unit;
  };

  createEffect(() => {
      const price = parseFloat(inputValue());
      if (!isNaN(price)) {
          const calc = (ratio) => roundToHoga(price * ratio);
          setResults({
              val1: calc(0.77),
              val2: calc(0.693),
              val3: calc(0.65835)
          });
      }
  });

  createEffect(() => {
      const high = parseFloat(highPrice());
      const low = parseFloat(lowPrice());
      if (!isNaN(high) && !isNaN(low)) {
          const src = (high + low) / 2;
          const calcStock = (value) => roundToHoga(value);
          
          setStockResults({
              val1: calcStock((src + high) / 2),
              val2: calcStock(src),
              val3: calcStock((src + low) / 2)
          });
      }
  });

  return (
      <Base>
          <Title>💰 가격 전환 계산기</Title>
          <Form>
              <InputGroup>
                  <div style={{ display: 'flex', gap: '20px' }}>
                      <div>
                          <Label>기준가:</Label>
                          <Input
                              type="number"
                              value={inputValue()}
                              onInput={(e) => setInputValue(e.target.value)}
                              placeholder="기준가 입력"
                          />
                      </div>
                  </div>
                  <ResultBox>
                      <p>저항: <Highlight>{results().val1}</Highlight></p>
                      <p>지지: <Highlight>{results().val2}</Highlight></p>
                      <p>위험: <AlertHighlight>{results().val3}</AlertHighlight></p>
                  </ResultBox>
              </InputGroup>
          </Form>

          <Title>📊 고가-저가 분석기</Title>
          <Form>
              <InputGroup>
                  <div style={{ display: 'flex', gap: '20px' }}>
                      <div>
                          <Label>고가:</Label>
                          <Input
                              type="number"
                              value={highPrice()}
                              onInput={(e) => setHighPrice(e.target.value)}
                              placeholder="고가 입력"
                          />
                      </div>
                      <div>
                          <Label>저가:</Label>
                          <Input
                              type="number"
                              value={lowPrice()}
                              onInput={(e) => setLowPrice(e.target.value)}
                              placeholder="저가 입력"
                          />
                      </div>
                  </div>
                  <ResultBox>
                      <p>고가: <Highlight>{stockResults().val1}</Highlight></p>
                      <p>평가: <Highlight>{stockResults().val2}</Highlight></p>
                      <p>저가: <AlertHighlight>{stockResults().val3}</AlertHighlight></p>
                  </ResultBox>
              </InputGroup>
          </Form>
          <StockPriceCalc />
      </Base>
  );
}

export default StockCalc;
  