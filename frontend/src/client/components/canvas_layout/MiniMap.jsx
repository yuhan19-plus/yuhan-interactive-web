/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */

import React from 'react'
import styled from 'styled-components'
import BtnMenuGroup from './BtnMenuGroup'

const MiniMap = () => {
    return (
        <MiniMapWrapper>
            <BtnMenuGroup />
            <MiniMapContentWrapper>
                <ClientPointer />
            </MiniMapContentWrapper>
        </MiniMapWrapper>
    )
}

const MiniMapWrapper = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 300px;
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
`

const ClientPointer = styled.div`
    position: absolute;
    width: 10px;
    height: 10px;
    top: 140px;
    left: 140px;
    border-radius: 50%;
    background-color: green;
`

export default MiniMap