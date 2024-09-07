/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */

import React from 'react'
import styled from 'styled-components'

const MiniMap = () => {
    return (
        <MiniMapWrapper>
            <ClientPointer />
        </MiniMapWrapper>
    )
}

const MiniMapWrapper = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background-color: #00000055;
    border-radius: 7px 7px 0px 7px;
    border: 5px solid #0F275C;
`

const ClientPointer = styled.div`
    position: absolute;
    width: 10px;
    height: 10px;
    top: 150px;
    left: 150px;
    border-radius: 50%;
    background-color: green;
`

export default MiniMap