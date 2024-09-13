/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */
import React from 'react'
import SideBar from './common/SideBar'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import SideMenuLayout from '../canvas/maps/structures/yuhan_map/3dUIs/SideMenuLayout'
import MiniMap from './MiniMap'
import AdminEnterModal from '../canvas/maps/structures/yuhan_map/3dUIs/modal/AdminEnterModal'
import BtnMenuGroup from './BtnMenuGroup'

const CanvasLayout = ({ children }) => {
    // children : 학교맵
    // console.log(children)
    const currentSideMenu = useSelector((state) => state.sideMenu)
    const currentSideMenuValue = currentSideMenu.value
    const currentSideMenuName = currentSideMenu.name

    const currentModal = useSelector((state) => state.modal)
    const currentModalName = currentModal.name
    const currentModalValue = currentModal.value

    // const currentMap = useSelector((state) => state.groundMap)
    // const currentMapName = currentMap.mapName

    // console.log('currentMapName', currentMapName)

    // console.log('sideMenuValue', currentSideMenuValue)
    // console.log('sideMenuName', currentSideMenuName)
    
    // console.log('currentModalValue', currentModalValue)
    // console.log('currentModalName', currentModalName)

    return (
        <>
            <Container>
                {children}
                <>
                    <SideBar />
                    <MiniMap />
                    {/* {
                        currentMapName === 'yh_map' &&
                            <MiniMap />
                    } */}
                    {
                        currentModalValue && 
                        <AdminEnterModal />
                    }
                    {
                        <SideMenuContainer className={currentSideMenuValue ? 'opened' : 'closed'}>
                            <SideMenuLayout pageName={currentSideMenuName} value={currentSideMenuValue} />
                        </SideMenuContainer>
                    }
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

const SideMenuContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    border-radius: 15px 0 0 15px;
    transition: 0.3s ease-in-out;

    &.opened {
        transform: translateX(0);
    }
    &.closed {
        transform: translateX(100%)
    }
`

export default CanvasLayout