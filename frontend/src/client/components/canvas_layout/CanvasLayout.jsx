/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */
import React from 'react'
import SideBar from './common/SideBar'
import styled from 'styled-components'

const CanvasLayout = ({children}) => {
    // children : 학교맵
    return (
        <>
            <Container>
                {children}
                <>
                    <SideBar />
                </>
            </Container>
        </>
    )
}

const Container = styled.div`
  position: relative;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
`

export default CanvasLayout