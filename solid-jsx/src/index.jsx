/* @refresh reload */
import { render } from 'solid-js/web'
import { styled } from 'solid-styled-components';
import App from './App';

const GlobalStyles = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    display: flex;
    height: 100vh;
    flex-direction: column;
    margin: 0;
    padding: 0;
    background-color: #a4a7ac;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
    width: 100vw;  // 뷰포트 전체 너비
    margin: 0;
    padding: 0;
  }
`;

const root = document.getElementById('root')

render(
    () => (
      <>
        <GlobalStyles />
        <App />
      </>
    ),
    document.getElementById('root')
  );