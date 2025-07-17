import { createEffect, onCleanup } from 'solid-js';
import { styled } from 'solid-styled-components';
import { A, useLocation } from '@solidjs/router';

const Base = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 5vh;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #282c34;
  color: white;
  top: 0;
  left: 0;  // 좌측 정렬 보정
  right: 0;  // 우측 정렬 보정
  z-index: 1000;
`;

const MenuLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HomeLink = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
`;

const HomeButton = styled(A)`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${props => props.active ? '#2ecc71' : '#27ae60'};
  text-decoration: none;
  transition: color 0.25s ease;
  
  &:hover {
    color: #2ecc71;
    &::before {
      filter: grayscale(0);
    }
  }

  &::before {
    content: '🏠';
    margin-right: 8px;
    filter: ${props => props.active ? 'grayscale(0)' : 'grayscale(0.7)'};
    transition: filter 0.25s ease;
  }
`;

const MenuLink = styled.div`
  margin-right: 10px;
  color: white;
  text-decoration: none;
  font-size: 1.0rem;
`;

const StyledLink = styled(A)`
  color: ${props => (props.active ? '#1a5d1a' : 'white')};
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #61dafb;
    background-color: rgba(63, 160, 179, 0.1);
    transform: translateY(-1px);
  }

  &.active {
    background-color: #3fa0b3;
    color: white !important;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
`;

const MenuRight = styled.div`
  display: flex;
  align-items: center;
`;

function Header() {
  const location = useLocation();

  createEffect(() => {
    console.log('Header 컴포넌트 나타남', location.pathname);
    
    onCleanup(() => {
      console.log('Header cleanUp 함수');
    });
  });

  return (
    <Base>
      <MenuLeft>
        <HomeLink>
          <HomeButton 
            href="/" 
            active={location.pathname === '/'}
          >
          </HomeButton>
        </HomeLink>
        <MenuLink>
          <StyledLink
            href='/testbet'
            active={location.pathname === '/testbet'}
          >
            바카라
          </StyledLink>
        </MenuLink>
        <MenuLink>
          <StyledLink
            href='/stockcalc'
            active={location.pathname === '/stockcalc'}
          >
            주식계산기
          </StyledLink>
        </MenuLink>
        <MenuLink>
          <StyledLink
            href='/test'
            active={location.pathname === '/test'}
          >
            테스트
          </StyledLink>
        </MenuLink>
      </MenuLeft>
      <MenuRight>
        <MenuLink style={{ "margin-right": '10px' }}>
          <StyledLink
            href='/signin'
            active={location.pathname === '/signin'}
          >
            로그인
          </StyledLink>
        </MenuLink>
        <MenuLink>
          <StyledLink
            href='/signup'
            active={location.pathname === '/signup'}
          >
            회원가입
          </StyledLink>
        </MenuLink>
      </MenuRight>
    </Base>
  );
}

export default Header;
