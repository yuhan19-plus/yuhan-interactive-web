/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */

import React, { useEffect } from 'react'
import styled from 'styled-components'
import BtnMenuGroup from './BtnMenuGroup'
import { useDispatch, useSelector } from 'react-redux'
import MiniMapContent from './mini_map/MiniMapContent'
import { initKiosk, kioskPyeonghwaOne, kioskPyeonghwaTwo, mainChar, miniMapTeleport } from '../../../redux/actions/actions'

const MiniMap = () => {
    const myChar = useSelector((state) => state.mChar)
    const kioskState = useSelector((state) => state.kiosk)
    const dispatch = useDispatch()
    const player = myChar.name
    const cameraPosition = [0, 1300, 0]
    const handleTeleport = (teleportPosition) => {
        dispatch(miniMapTeleport(teleportPosition))
    }

    return (
        <MiniMapWrapper>
            <BtnMenuGroup />
            <MiniMapContentWrapper>
                <MiniMapContent cameraPosition={cameraPosition} />
                <Teleport top="40%" right="40%" onClick={() => {
                    handleTeleport([50, 0.3, -134])}
                }>
                    평화관 정문
                </Teleport>
                <Teleport top="55%" right="45%" onClick={() => {
                    handleTeleport([59, 0.3, 21])}
                }>
                    평화관 후문
                </Teleport>
                <Teleport top="35%" right="30%" onClick={() => {
                    handleTeleport([156, 0.3, -188])}
                }>
                    봉사관
                </Teleport>
                <Teleport top="35%" left="30%" onClick={() => {
                    handleTeleport([-193, 0.3, -235])}
                }>
                    자유관
                </Teleport>
                <Teleport top="65%" right="25%" onClick={() => {
                    handleTeleport([182, 0.3, 126])}
                }>
                    학생회관
                </Teleport>
                <Teleport top="63%" right="45%" onClick={() => {
                    handleTeleport([37, 0.3, 55])}
                }>
                    나눔관
                </Teleport>
                <Teleport top="80%" left="30%" onClick={() => {
                    handleTeleport([-178, 0.3, 263])}
                }>
                    창조관
                </Teleport>
                <Teleport top="65%" left="25%" onClick={() => {
                    handleTeleport([-225, 0.3, 95])}
                }>
                    유일한기념관
                </Teleport>
                <Teleport top="50%" left="15%" onClick={() => {
                    handleTeleport([-298, 0.3, -63])}
                }>
                    유재라관
                </Teleport>

                <ClientPointer
                    id={`student-point-${player}`}
                />
            </MiniMapContentWrapper>
        </MiniMapWrapper>
    )
}

const Teleport = styled.div`
    position: absolute;
    width: 16%;
    height: 5%;
    background-color: #63CAB9;
    /* background-color: #015850; */
    font-size: 10px;
    font-weight: 900;
    border-radius: 50%;
    display : flex;
    justify-content : center;
    align-items : center;
    cursor: pointer;
    color: #015850;
    /* color: white; */
    ${(props) => props.top && `top: ${props.top};`}
    ${(props) => props.right && `right: ${props.right};`}
    ${(props) => props.left && `left: ${props.left};`}
    transition: all 0.2s ease-in-out;
    &:hover {
        width: 17%;
        height: 6%;
        font-size: 11px;
    }
`

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