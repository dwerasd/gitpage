import { createSignal } from 'solid-js';
import { styled } from 'solid-styled-components';

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

const Title = styled('h1')`
  color: #fff;
  margin-bottom: 25px;
  font-size: 1.8rem;
  text-align: left;
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

const Label = styled('label')`
  font-weight: bold;
  color: #eee;
  font-size: 0.95rem;
  width: 100%;
  text-align: left;
  margin-left: 5px;
`;

const InputWrapper = styled('div')`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  width: 100%;
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
`;

const Button = styled('button')`
  padding: 8px 16px;
  background: #444;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background: #555;
  }
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

const HighlightYellow = styled('span')`
  background-color: #ffeb3b;
  color: #000;
  padding: 2px 6px;
  border-radius: 3px;
  margin: 0 3px;
  font-weight: 600;
`;

const HighlightPink = styled('span')`
  background-color: pink;
  color: #000;
  padding: 2px 6px;
  border-radius: 3px;
  margin: 0 3px;
  font-weight: 600;
`;

const HighlightBlue = styled('span')`
  display: inline-block;
  width: 80px;
  text-align: center;
  background-color: lightblue;
  color: #000;
  padding: 2px 6px;
  border-radius: 3px;
  margin: 0 3px;
  font-weight: 600;
`;

const HighlightGreen = styled('span')`
  background-color: lightgreen;
  color: #000;
  padding: 2px 6px;
  border-radius: 3px;
  margin: 0 3px;
  font-weight: 600;
`;

const ResultBox = styled('div')`
  padding: 15px;
  background: #1e1e1e;
  border-radius: 8px;
  margin-top: 20px;
  font-size: 1.1rem;
  text-align: left;
`;

const LogBox = styled('div')`
  margin-top: 20px;
  padding: 15px;
  background: #1e1e1e;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    padding: 5px 0;
    border-bottom: 1px solid #333;
  }
`;

const ArrayWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 5px;
`;

const TestBet = () => {
    const [initialBalance, setInitialBalance] = createSignal(3000000);
    const [initialValue, setInitialValue] = createSignal(1000);
    const [betArray, setBetArray] = createSignal([initialValue(), initialValue(), initialValue(), initialValue()]);
    const [multiplierB, setMultiplierB] = createSignal('1.95');
    const [multiplierP, setMultiplierP] = createSignal('1.95');
    const [countBet, setCountBet] = createSignal(0);
    const [betAmount, setBetAmount] = createSignal(initialValue() * 2);
    const [balance, setBalance] = createSignal(initialBalance());
    const [profit, setProfit] = createSignal(0);
    const [logs, setLogs] = createSignal([]);
    const [currentTarget, setCurrentTarget] = createSignal('뱅커');
  
    const handleInitialBalanceChange = (e) => {
      const value = parseInt(e.target.value, 10);
      setInitialBalance(value);
    };
  
    const handleInitialValueChange = (e) => {
      const value = parseInt(e.target.value, 10);
      setInitialBalance(initialBalance());
      setInitialValue(value);
      setBetArray([value, value, value, value]);
      setBetAmount(value * 2);
      setBalance(initialBalance());
      setProfit(0);
      setLogs([]);
      setCountBet(0);
      setCurrentTarget('뱅커');
    };
  
    const handleMultiplierChangeB = (e) => {
      setMultiplierB(e.target.value);
    };

    const handleMultiplierChangeP = (e) => {
      setMultiplierP(e.target.value);
    };

    const initBet = () => {
      setBetArray([initialValue(), initialValue(), initialValue(), initialValue()]);
      setBetAmount(initialValue() * 2);
      setBalance(initialBalance());
      setProfit(0);
      setLogs([]);
      setCountBet(0);
      setCurrentTarget('뱅커');
    };

    const reverseBtn = () => {
      setCurrentTarget(currentTarget() === '뱅커' ? '플레이어' : '뱅커');
    };
  
    const writeLog = (newLog) => {
      setLogs((prev) => {
        const newLogs = [...prev(), newLog];
        if (newLogs.length > 30) {
          return newLogs.slice(1);
        }
        return newLogs;
      });
    };

    const placeBet = (betOn) => {
      const currentTargetValue = currentTarget(); // 현재 값을 미리 저장
      const myBet = currentTargetValue === '뱅커' ? 'B' : 'P';
      let newProfit = profit() - betAmount();
      let newBalance = balance() - betAmount();
      const result = myBet === betOn ? 'O' : 'X';
      let newBetArray = [...betArray()];
    
      if (myBet === betOn) {
        const multiplier = myBet === 'P' ? 
          parseFloat(multiplierP()) : 
          parseFloat(multiplierB());
        
        newProfit += betAmount() * multiplier;
        newBalance += betAmount() * multiplier;
        
        newBetArray.shift();
        newBetArray.pop();
      } else {
        newBetArray.push(betAmount());
      }
    
      const log = `[${countBet()}] : ${myBet}(${betAmount()}) => ${betOn}(${betAmount()})${result}(${newProfit})`;
      
      // 모든 상태 업데이트를 한번에 처리
      setCurrentTarget(currentTargetValue === '뱅커' ? '플레이어' : '뱅커');
      setBetArray(newBetArray);
      setBetAmount(newBetArray.length === 0 ? initialValue() * 2 : 
                   newBetArray.length === 1 ? newBetArray[0] : 
                   newBetArray[0] + newBetArray[newBetArray.length - 1]);
      setProfit(newProfit);
      setBalance(newBalance);
      setCountBet(prev => prev + 1);
      writeLog(log);
      
      if (newBetArray.length === 0) {
        setBetArray([initialValue(), initialValue(), initialValue(), initialValue()]);
        writeLog('----------------------------------------');
      }
    };

    return (
        <Base>
          <Title>🎲 베팅 게임</Title>
          <Form>
            <InputGroup>
              <Label>초기 설정</Label>
              <InputWrapper>
                <Input
                  type="number"
                  value={initialBalance()}
                  onInput={handleInitialBalanceChange}
                  placeholder="초기 잔고"
                />
                <Input
                  type="number"
                  value={initialValue()}
                  onInput={handleInitialValueChange}
                  placeholder="베팅 기준 금액"
                />
              </InputWrapper>
            </InputGroup>
      
            <InputGroup>
              <Label>배당률 설정</Label>
              <InputWrapper>
                <Input
                  type="number"
                  step="0.01"
                  value={multiplierB()}
                  onInput={handleMultiplierChangeB}
                  placeholder="뱅커 배당률"
                />
                <Input
                  type="number"
                  step="0.01"
                  value={multiplierP()}
                  onInput={handleMultiplierChangeP}
                  placeholder="플레이어 배당률"
                />
              </InputWrapper>
            </InputGroup>
            <InfoBox>
            잔고: <HighlightPink>{balance().toLocaleString()}</HighlightPink>원
            수익금: <HighlightPink>{profit().toLocaleString()}</HighlightPink>원
            총 베팅 횟수: <HighlightYellow>{countBet()}</HighlightYellow>회
            <Button onClick={initBet}>초기화</Button>
            </InfoBox>

            <ResultBox>
            <div>
                <HighlightBlue>{currentTarget()}</HighlightBlue>에 
                <HighlightGreen>{betAmount().toLocaleString()}</HighlightGreen>원을 베팅하세요.
                <Button onClick={reverseBtn}>뒤집기</Button>
            </div>
            <div style={{"margin-top": "15px"}}>
                게임 결과:
                <Button onClick={() => placeBet('B')}>뱅커 승리</Button>
                <Button onClick={() => placeBet('P')}>플레이어 승리</Button>
            </div>
            </ResultBox>
            <InfoBox>
            배팅 배열:
            <ArrayWrapper>
                {betArray().map((bet, index) => (
                <HighlightYellow>{bet.toLocaleString()}</HighlightYellow>
                ))}
            </ArrayWrapper>
            </InfoBox>
            <LogBox>
            <h3>베팅 기록</h3>
            <ul>
                {logs().map((log, index) => (
                <li>{log}</li>
                ))}
            </ul>
            </LogBox>
        </Form>
        </Base>
    );
};

export default TestBet;
    
  
