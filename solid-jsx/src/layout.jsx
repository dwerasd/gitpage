import { styled } from 'solid-styled-components';
import { createEffect, onCleanup } from 'solid-js';
import Header from './pages/header';
import Footer from './pages/footer';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;  // 추가
`;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Content = styled.main`
  flex-grow: 1;
  padding: 20px;
  margin-top: 5vh;  // 헤더 높이만큼 여백
  width: 100%;
  min-height: calc(100vh - 10vh);  // 뷰포트 높이 고려
  padding-bottom: 5vh;  // footer 높이만큼 추가
  margin-bottom: 5vh;  // footer 높이만큼 여백
`;

function Layout(props) {
  createEffect(() => {
    console.log("Layout 컴포넌트 나타남");
     
    onCleanup(() => {
      console.log("Layout cleanUp 함수");
    });
  });
  return (
    <AppContainer>
      <LayoutContainer>
        <Header />
        <Content>
          {props.children}
        </Content>
        <Footer />
      </LayoutContainer>
    </AppContainer>
  );
}

export default Layout;
