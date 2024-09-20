import { faBus, faPlane, faSmoking } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { aerialView, initKiosk } from '../../../redux/actions/actions'

const BtnMenuGroup = () => {
    const dispatch = useDispatch()
    const handleAerialView = (e) => {
        e.stopPropagation()
        dispatch(initKiosk())
        dispatch(aerialView())
    }
    return (
        <BtnMenuWrapper>
            <BtnList>
                <BtnItem onClick={handleAerialView} data-tooltip='항공뷰'>
                    <FontAwesomeIcon icon={faPlane} />
                </BtnItem>
                <BtnItem data-tooltip='흡연구역'>
                    <FontAwesomeIcon icon={faSmoking} />
                </BtnItem>
                <BtnItem data-tooltip='찾아오는 길'>
                    <FontAwesomeIcon icon={faBus} />
                </BtnItem>
            </BtnList>
        </BtnMenuWrapper>
    )
}

const BtnMenuWrapper = styled.div`
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
    background-color: #0F275C;
    border-radius: 25px;
    border: none;
    color: white;
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
    }

    &:hover::after {
        content: attr(data-tooltip);
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #0F275C;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        white-space: nowrap;
        font-size: 12px;
        font-weight: 900;
        opacity: 1;
        visibility: visible;
    }

    &::after {
        content: "";
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #0F275C;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        white-space: nowrap;
        font-size: 12px;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
    }
`

export default BtnMenuGroup