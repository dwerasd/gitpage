import { createEffect, onCleanup } from 'solid-js';
import { styled } from 'solid-styled-components';

const Base = styled.div`
  position: fixed;
  top: 5.0vh;
  min-height: 91.6vh;
  left: 0;
  width: 100%;
  padding: 0 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  text-align: left;
  font-family: Arial, sans-serif;
`;

function Main() {
  createEffect(() => {
    console.log('Main 시작');
    
    onCleanup(() => {
      console.log('Main 소멸');
    });
  });

  return (
    <Base>
      <h4>메인 페이지</h4>
    </Base>
  );
}

export default Main;
