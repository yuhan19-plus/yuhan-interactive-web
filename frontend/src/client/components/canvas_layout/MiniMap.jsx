/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */

import React from 'react'
import styled from 'styled-components'
import BtnMenuGroup from './BtnMenuGroup'
import { useSelector } from 'react-redux'
import MiniMapContent from './mini_map/MiniMapContent'

const MiniMap = () => {
    const myChar = useSelector((state) => state.mChar)
    const player = myChar.name
    const cameraPosition = [0, 1300, 0]

    return (
        <MiniMapWrapper>
            <BtnMenuGroup />
            <MiniMapContentWrapper>
                <MiniMapContent cameraPosition={cameraPosition} />
                <ClientPointer
                    id={`student-point-${player}`}
                />
            </MiniMapContentWrapper>
        </MiniMapWrapper>
    )
}

const MiniMapWrapper = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    width: 330px;
    height: 330px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const MiniMapContentWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #00000055;
    border-radius: 7px 7px 0px 7px;
    border: 5px solid #0F275C;
    padding-top: 15px;
    padding-left: 5px;
`

const ClientPointer = styled.div`
    position: absolute;
    top: 145px;
    right: 145px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-image: url('/assets/images/miniMapPointer.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;


export default MiniMap