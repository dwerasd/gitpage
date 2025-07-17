import { createEffect, onCleanup } from 'solid-js';
import { Router, Route } from '@solidjs/router';

import Layout from './layout';
import Main from './pages/Main';
import Test from './pages/Test';
import TestBet from './pages/TestBet';
import StockCalc from './pages/stockcalc';


function App() {
  createEffect(() => {
    console.log("App 컴포넌트 나타남");
    
    onCleanup(() => {
      console.log("App cleanUp 함수");
    });
  });

  return (
    <Router>
      <Route path="/" component={Layout}>
        <Route path="/" component={Main} />
        <Route path="/trends" component={Test} />
        <Route path="/custom" component={Test} />
        <Route path="/signin" component={Test} />
        <Route path="/signup" component={Test} />
        <Route path="/test" component={Test} />
        <Route path="/testbet" component={TestBet} />
        <Route path="/stockcalc" component={StockCalc} />
        <Route path="/*" component={Test} />
      </Route>
    </Router>
  );
}

export default App;
