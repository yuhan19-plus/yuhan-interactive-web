/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 
 */
import React from 'react'
import styled from 'styled-components'
import SideBar from './common/SideBar'
import DepartmentCanvas from '../canvas/maps/structures/department_map/DepartmentCanvas'

const DeptCanvasLayout = () => {
    
    return (
        <>
            <Container>
                <DepartmentCanvas />
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
export default DeptCanvasLayout