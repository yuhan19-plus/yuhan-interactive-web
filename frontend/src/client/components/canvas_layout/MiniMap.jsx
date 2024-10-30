/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ViewGroup from './ViewGroup'
import { useDispatch, useSelector } from 'react-redux'
import MiniMapContent from './mini_map/MiniMapContent'
import { miniMapTeleport } from '../../../redux/actions/actions'
import Swal from 'sweetalert2'

const MiniMap = () => {
    const myChar = useSelector((state) => state.mChar)
    const dispatch = useDispatch()
    const player = myChar.name
    const cameraPosition = [0, 1300, 0]

    const handleTeleport = (teleportPosition) => {
        // console.log("Teleporting to:", teleportPosition)
        dispatch(miniMapTeleport(teleportPosition))
    }

    return (
        <MiniMapWrapper>
            <ViewGroup />
            <MiniMapContentWrapper>
                <MiniMapContent cameraPosition={cameraPosition} />
                <Teleport style={{top: "40%", right: "40%"}} $tooltipcontent="평화관 정문" onClick={() => {
                    Swal.fire({
                        icon: "question",
                        title: "평화관 정문",
                        text: `평화관 정문으로 이동하시겠습니까?`,
                        showCancelButton: true,
                        confirmButtonText: "이동",
                        cancelButtonText: "취소",
                    }).then((res) => {
                        if (res.isConfirmed) {
                            handleTeleport([50, 0.3, -134])
                        }
                        else{
                            return
                        }
                    })}
                } />
                <Teleport style={{top: "55%", right: "45%"}} $tooltipcontent="평화관 후문" onClick={() => {
                    Swal.fire({
                        icon: "question",
                        title: "평화관 후문",
                        text: `평화관 후문으로 이동하시겠습니까?`,
                        showCancelButton: true,
                        confirmButtonText: "이동",
                        cancelButtonText: "취소",
                    }).then((res) => {
                        if (res.isConfirmed) {
                            handleTeleport([59, 0.3, 21])
                        }
                        else{
                            return
                        }
                    })}
                } />
                <Teleport style={{top: "35%", right: "30%"}} $tooltipcontent="봉사관" onClick={() => {
                    Swal.fire({
                        icon: "question",
                        title: "봉사관",
                        text: `봉사관으로 이동하시겠습니까?`,
                        showCancelButton: true,
                        confirmButtonText: "이동",
                        cancelButtonText: "취소",
                    }).then((res) => {
                        if (res.isConfirmed) {
                            handleTeleport([156, 0.3, -188])
                        }
                        else{
                            return
                        }
                    })}
                } />
                <Teleport style={{top: "35%", left: "33%"}} $tooltipcontent="자유관" onClick={() => {
                    Swal.fire({
                        icon: "question",
                        title: "자유관",
                        text: `자유관으로 이동하시겠습니까?`,
                        showCancelButton: true,
                        confirmButtonText: "이동",
                        cancelButtonText: "취소",
                    }).then((res) => {
                        if (res.isConfirmed) {
                            handleTeleport([-193, 0.3, -235])
                        }
                        else{
                            return
                        }
                    })}
                } />
                <Teleport style={{top: "65%", right: "30%"}} $tooltipcontent="학생회관" onClick={() => {
                    Swal.fire({
                        icon: "question",
                        title: "학생회관",
                        text: `학생회관으로 이동하시겠습니까?`,
                        showCancelButton: true,
                        confirmButtonText: "이동",
                        cancelButtonText: "취소",
                    }).then((res) => {
                        if (res.isConfirmed) {
                            handleTeleport([182, 0.3, 126])
                        }
                        else{
                            return
                        }
                    })}
                } />
                <Teleport style={{top: "60%", right: "45%"}} $tooltipcontent="나눔관" onClick={() => {
                    Swal.fire({
                        icon: "question",
                        title: "나눔관",
                        text: `나눔관으로 이동하시겠습니까?`,
                        showCancelButton: true,
                        confirmButtonText: "이동",
                        cancelButtonText: "취소",
                    }).then((res) => {
                        if (res.isConfirmed) {
                            handleTeleport([37, 0.3, 55])
                        }
                        else{
                            return
                        }
                    })}
                } />
                <Teleport style={{top: "79%", left: "33%"}} $tooltipcontent="창조관" onClick={() => {
                    Swal.fire({
                        icon: "question",
                        title: "창조관",
                        text: `창조관으로 이동하시겠습니까?`,
                        showCancelButton: true,
                        confirmButtonText: "이동",
                        cancelButtonText: "취소",
                    }).then((res) => {
                        if (res.isConfirmed) {
                            handleTeleport([-178, 0.3, 263])
                        }
                        else{
                            return
                        }
                    })}
                } />
                <Teleport style={{top: "65%", left: "30%"}} $tooltipcontent="유일한기념관" onClick={() => {
                    Swal.fire({
                        icon: "question",
                        title: "유일한기념관",
                        text: `유일한기념관으로 이동하시겠습니까?`,
                        showCancelButton: true,
                        confirmButtonText: "이동",
                        cancelButtonText: "취소",
                    }).then((res) => {
                        if (res.isConfirmed) {
                            handleTeleport([-225, 0.3, 95])
                        }
                        else{
                            return
                        }
                    })}
                } />
                <Teleport style={{top: "48%", left: "17.5%"}} $tooltipcontent="유재라관" onClick={() => {
                    Swal.fire({
                        icon: "question",
                        title: "유재라관",
                        text: `유재라관으로 이동하시겠습니까?`,
                        showCancelButton: true,
                        confirmButtonText: "이동",
                        cancelButtonText: "취소",
                    }).then((res) => {
                        if (res.isConfirmed) {
                            handleTeleport([-298, 0.3, -63])
                        }
                        else{
                            return
                        }
                    })}
                } />

                <ClientPointer
                    id={`student-point-${player}`}
                />
            </MiniMapContentWrapper>
        </MiniMapWrapper>
    )
}

const Teleport = styled.div`
    position: absolute;
    width: 5%;
    height: 5%;
    background-color: var(--main-color);
    font-weight: 900;
    border-radius: 50%;
    border: 2px solid var(--yuhan-yellow-color);
    display : flex;
    justify-content : center;
    align-items : center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        width: 6%;
        height: 6%;

        /* 버튼 위에 말풍선 표시 */
        &::after {
            content: '${(props) => props.$tooltipcontent || ''}';
            position: absolute;
            bottom: 200%; 
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--main-color);
            color: var(--yuhan-yellow-color);
            font-size: 17px;
            padding: 5px 10px;
            border-radius: 5px;
            white-space: nowrap;
            z-index: 10;
            opacity: 1;
            transition: opacity 0.3s ease-in-out;
        }

        /* 말풍선 아래에 삼각형 표시 */
        &::before {
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 10px;
            border-style: solid;
            border-color: var(--main-color) transparent transparent transparent;
            z-index: 10;
        }
    }

    &:not(:hover) {
        &::after {
            opacity: 0;
        }
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
    background: black;
    border-radius: 7px 7px 0px 7px;
    border: 5px solid var(--main-color);
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