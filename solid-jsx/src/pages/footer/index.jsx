import { styled } from 'solid-styled-components';

const clicked_goto_site = () => {
  window.open('https://github.com/dwerasd', '_blank');
};

const Base = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 5vh;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: 0;
  margin-right: 0;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #282c34;
  color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5vh;
`;

const MenuLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MenuRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MenuLink = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 1.0rem;
  color: #fff;
  text-decoration: none;
  &:hover {
    color: #3fa0b3;
  }
`;

const StyledMenuLink = styled(MenuLink)`
  /* MenuLink 컴포넌트를 상속받아 스타일 변경 가능 */
`;

function Footer() {
  return (
    <Base>
      <MenuLeft>
      </MenuLeft>
      <MenuRight>
        <StyledMenuLink onClick={clicked_goto_site}>Github</StyledMenuLink>
      </MenuRight>
    </Base>
  );
}

export default Footer;
