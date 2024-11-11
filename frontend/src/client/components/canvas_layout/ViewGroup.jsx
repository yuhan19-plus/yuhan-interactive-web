import { faBus, faLocationDot, faPlane, faSmoking } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { aerialView, campusGuideView, directionsView, initBusStation, initKiosk, initSmokingArea, initStatue, initView, smokingAreaView } from '../../../redux/actions/actions'
import Swal from 'sweetalert2'

const ViewGroup = () => {
    const dispatch = useDispatch()

    const kioskState = useSelector((state) => state.kiosk)
    const busState = useSelector((state) => state.bus)
    const smokingState = useSelector((state) => state.smokingArea)
    const statueState = useSelector((state) => state.statue)
    const goldBoxState = useSelector((state) => state.goldBox)
    const kioskValue = kioskState.value
    const busValue = busState.value
    const smokingValue = smokingState.value
    const statueValue = statueState.inStatue
    const goldBoxValue = goldBoxState.isZone

    // 미니맵 상단 버튼 handle메서드
    const handleAerialView = (e) => {
        e.stopPropagation()
        if (kioskValue || busValue || smokingValue || statueValue || goldBoxValue) {
            // if(kioskValue) dispatch(initKiosk())
            // if(busValue) dispatch(initBusStation())
            // if(smokingValue) dispatch(initSmokingArea())
            // if(statueValue) dispatch(initStatue())
            
            Swal.fire({
                icon: "info",
                title: "안내",
                text: "해당 이벤트 영역에서는 이용할 수 없습니다."
            })
        }
        else {
            dispatch(aerialView())
        }
    } 
    const handleDirectionsView = (e) => {
        e.stopPropagation()
        if (kioskValue || busValue || smokingValue || statueValue || goldBoxValue) {
            // if(kioskValue) dispatch(initKiosk())
            // if(busValue) dispatch(initBusStation())
            // if(smokingValue) dispatch(initSmokingArea())
            // if(statueValue) dispatch(initStatue())

            Swal.fire({
                icon: "info",
                title: "안내",
                text: "해당 이벤트 영역에서는 이용할 수 없습니다."
            })
        }
        else {
            dispatch(directionsView())
        }
    } 
    const handleSmokingAreaView = (e) => {
        e.stopPropagation()
        if (kioskValue || busValue || smokingValue || statueValue || goldBoxValue) {
            // if(kioskValue) dispatch(initKiosk())
            // if(busValue) dispatch(initBusStation())
            // if(smokingValue) dispatch(initSmokingArea())
            // if(statueValue) dispatch(initStatue())
                
            Swal.fire({
                icon: "info",
                title: "안내",
                text: "해당 이벤트 영역에서는 이용할 수 없습니다."
            })
        }
        else {
            dispatch(smokingAreaView())
        }
    }
    const handleGuideView = (e) => {
        e.stopPropagation()
        if (kioskValue || busValue || smokingValue || statueValue || goldBoxValue) {
            // if(kioskValue) dispatch(initKiosk())
            // if(busValue) dispatch(initBusStation())
            // if(smokingValue) dispatch(initSmokingArea())
            // if(statueValue) dispatch(initStatue())
                
            Swal.fire({
                icon: "info",
                title: "안내",
                text: "해당 이벤트 영역에서는 이용할 수 없습니다."
            })
        }
        else {
            dispatch(campusGuideView())
        }
    }

    return (
        <ViewWrapper>
            <BtnList>
                <BtnItem onClick={handleAerialView} data-tooltip='항공뷰'>
                    <FontAwesomeIcon icon={faPlane} />
                </BtnItem>
                <BtnItem onClick={handleSmokingAreaView} data-tooltip='흡연구역안내'>
                    <FontAwesomeIcon icon={faSmoking} />
                </BtnItem>
                <BtnItem onClick={handleDirectionsView} data-tooltip='정류장안내'>
                    <FontAwesomeIcon icon={faBus} />
                </BtnItem>
                <BtnItem onClick={handleGuideView} data-tooltip='캠퍼스안내'>
                    <FontAwesomeIcon icon={faLocationDot} />
                </BtnItem>
            </BtnList>
        </ViewWrapper>
    )
}

const ViewWrapper = styled.div`
    width: 100%;
    height: 30px;
`

const BtnList = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const BtnItem = styled.button`
    width: 50px;
    height: 50px;
    background-color: var(--main-color);
    border-radius: 25px;
    border: none;
    color: var(--sub-color);
    padding: 10px;
    svg {
        width: 100%;
        height: 100%;
    }

    &:hover {
        cursor: pointer;
        scale: 1.1;
        transition: .2s ease-in-out;
        position: relative;
        color: var(--font-yellow-color);
        border-color: var(--font-yellow-color);
    }

    &:hover::after {
        content: attr(data-tooltip);
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--main-color);
        padding: 5px 10px;
        border-radius: 5px;
        white-space: nowrap;
        font-size: 12px;
        font-weight: 900;
        opacity: 1;
        visibility: visible;
        color: var(--font-yellow-color);
    }

    &::after {
        content: "";
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--main-color);
        color: var(--sub-color);
        padding: 5px 10px;
        border-radius: 5px;
        white-space: nowrap;
        font-size: 12px;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
    }
`

export default ViewGroup