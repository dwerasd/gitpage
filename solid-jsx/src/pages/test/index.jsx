import { createEffect, onCleanup } from 'solid-js'
import { useLocation } from '@solidjs/router'
import { styled } from 'solid-styled-components'

const Base = styled('div')`
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
`

const MenuLeft = styled('div')`
  font-size: 100%;
  align-items: center;
  color: white;
`

function Test() {
  const location = useLocation()

  createEffect(() => {
    console.log('Test 시작')
    
    onCleanup(() => {
      console.log('Test 소멸')
    })
  })

  return (
    <Base>
      <MenuLeft>
        <h4>테스트 페이지</h4>
      </MenuLeft>
    </Base>
  )
}

export default Test
